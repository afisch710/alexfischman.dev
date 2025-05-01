// index.js
const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const handler = async (event) => {
    try {
        const code = event.queryStringParameters?.code;

        // 1. No code yet? Redirect user to GitHub for auth
        if (!code) {
            const params = new URLSearchParams({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: process.env.REDIRECT_URI,
                scope: 'repo',
                state: Math.random().toString(36).substring(7) // Add CSRF protection
            });
            return {
                statusCode: 302,
                headers: {
                    'Location': `https://github.com/login/oauth/authorize?${params.toString()}`,
                    'Cache-Control': 'no-store'
                },
            };
        }

        // 2. Exchange code for an access token
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: process.env.REDIRECT_URI,
            }),
        });

        if (!tokenRes.ok) {
            throw new Error(`GitHub token exchange failed: ${tokenRes.statusText}`);
        }

        const data = await tokenRes.json();
        
        if (data.error) {
            throw new Error(`GitHub OAuth error: ${data.error_description || data.error}`);
        }

        const { access_token } = data;

        if (!access_token) {
            throw new Error('No access token received from GitHub');
        }

        // 3. Return HTML that passes the token to the CMS
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store',
                'X-Content-Type-Options': 'nosniff',
                'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'"
            },
            body: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>Authentication Complete</title>
                </head>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.CMS.authenticate({ token: "${access_token}" });
                            window.close();
                        } else {
                            document.body.innerHTML = 'Authentication successful! You can close this window.';
                        }
                    </script>
                </body>
                </html>
            `,
        };
    } catch (error) {
        console.error('OAuth error:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store'
            },
            body: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>Authentication Error</title>
                </head>
                <body>
                    <script>
                        if (window.opener) {
                            window.opener.CMS.authError('${error.message.replace(/'/g, "\\'")}');
                            window.close();
                        } else {
                            document.body.innerHTML = 'Authentication failed. You can close this window.';
                        }
                    </script>
                </body>
                </html>
            `,
        };
    }
};

module.exports = { handler };