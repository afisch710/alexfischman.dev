// index.js
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

exports.handler = async (event) => {
    try {
        const { code, state: returnedState } = event.queryStringParameters || {};
        const cookieHeader = event.headers?.cookie || event.headers?.Cookie || '';
        const redirect_uri = process.env.REDIRECT_URI;

        // 1. No code yet? Redirect user to GitHub for auth
        const generatedState = Math.random().toString(36).substring(2);
        if (!code) {
            const params = new URLSearchParams({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri,
                scope: 'repo',
                state: generatedState
            });
            return {
                statusCode: 302,
                headers: {
                    Location: `https://github.com/login/oauth/authorize?${params.toString()}`,
                    'Cache-Control': 'no-store',
                    'Set-Cookie': `oauth_state=${generatedState}; HttpOnly; Path=/; Secure; SameSite=Lax`
                }
            };
        }

        // Validate OAuth state
        const match = cookieHeader.match(/(?:^|; )oauth_state=([^;]+)/);
        if (!match) {
            throw new Error('Missing oauth_state cookie');
        }
        const savedState = match[1];
        if (returnedState !== savedState) {
            throw new Error('Invalid OAuth state');
        }

        // 2. Exchange code for an access token
        // Prepare URL-encoded body
        const params = new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri,
            state: returnedState
        });
        const tokenResponse = await fetch(
            'https://github.com/login/oauth/access_token',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: params.toString()
            }
        );
        // Fail on non-2xx
        if (!tokenResponse.ok) {
            const text = await tokenResponse.text();
            throw new Error(`Token exchange failed: ${tokenResponse.status} ${text}`);
        }
        const tokenData = await tokenResponse.json();

        if (tokenData.error || !tokenData.access_token) {
            throw new Error(
                tokenData.error_description || tokenData.error || 'No access token'
            );
        }

        const token = tokenData.access_token;

        // 3. Return HTML snippet to authenticate CMS and close window
        const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <script>
    if (window.opener && window.opener.CMS) {
      window.opener.CMS.authenticate({ token: "${token}" });
    }
    window.close();
  </script>
  <noscript>Please close this window and return to the CMS.</noscript>
</body>
</html>`;

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
            body: html
        };
    } catch (error) {
        console.error('OAuth proxy error:', error);
        const errHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <script>
    if (window.opener && window.opener.CMS && window.opener.CMS.authError) {
      window.opener.CMS.authError(${JSON.stringify(error.message)});
    }
    window.close();
  </script>
  <noscript>Authentication failed: ${error.message}</noscript>
</body>
</html>`;
        return {
            statusCode: 500,
            headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
            body: errHtml
        };
    }
};