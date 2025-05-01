// index.js
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

exports.handler = async (event) => {
  try {
    const code = event.queryStringParameters?.code;
    const redirect_uri = process.env.REDIRECT_URI;

    // ---------- Verbose debug logging ----------
    console.log('Callback query:', event.queryStringParameters);
    // console.log('Cookie header:', event.headers?.cookie || event.headers?.Cookie);
    console.log('Has client ID?', !!process.env.GITHUB_CLIENT_ID);
    console.log('Has client secret?', !!process.env.GITHUB_CLIENT_SECRET);
    // -------------------------------------------
    console.log('redirect_uri:', redirect_uri);

    // 1. No code yet? Redirect user to GitHub for auth
    if (!code) {
      const params = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID,
        redirect_uri,
        scope: 'repo'
      });
      const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
      const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <script>
    window.location = "${authUrl}";
  </script>
  <noscript>
    <a href="${authUrl}">Click here to authenticate</a>.
  </noscript>
</body>
</html>`;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html', 'Cache-Control': 'no-store' },
        body: html
      };
    }

    // 2. Exchange code for an access token
    // Prepare URL-encoded body
    const params = new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code
    });
    console.log('POSTing to GitHub with body:', params.toString());
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
    console.log('GitHub token response:', tokenData);

    if (tokenData.error || !tokenData.access_token) {
      throw new Error(
        tokenData.error_description || tokenData.error || 'No access token'
      );
    }

    const token = tokenData.access_token;

    // 3. Set OAuth token in HttpOnly cookie and redirect to CMS
    return {
      statusCode: 302,
      headers: {
        'Set-Cookie': `github_oauth_token=${token}; HttpOnly; Secure; SameSite=Lax; Path=/admin`,
        'Location': '/admin/'
      }
    };
  } catch (error) {
    console.error('OAuth proxy error:', error);
    const errHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body>
  <script>
    // Send OAuth error back to CMS via postMessage
    if (window.opener) {
      window.opener.postMessage(
        { type: 'OAUTH_ERROR', error: ${JSON.stringify(error.message)} },
        '*'
      );
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