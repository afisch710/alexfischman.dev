# GitHub OAuth Proxy Service

This service provides a secure OAuth proxy for Netlify CMS (Decap CMS) integration with GitHub. It handles the OAuth flow and token exchange with GitHub, providing a secure backend for the CMS authentication.

## Architecture

The service consists of:

- **AWS Lambda Function**: Handles the OAuth flow and token exchange
- **API Gateway**: Provides the HTTP interface with rate limiting and API key protection
- **S3 Bucket**: Stores Lambda deployment artifacts
- **CloudFront Integration**: Routes `/oauth/*` requests from the main domain

## Security Features

- API Key protection with usage plan
- Rate limiting (5 requests/second with 10 request burst)
- Daily quota (1000 requests)
- CSRF protection with state parameter
- Secure token exchange
- No-store cache headers
- Private S3 bucket for artifacts
- 30-day artifact lifecycle policy

## Prerequisites

- AWS account with appropriate permissions
- GitHub OAuth App credentials
- API Key for the proxy service

## Deployment

The service is deployed using GitHub Actions workflows:

1. **CI Pipeline** (`.github/workflows/oauth-ci.yml`):
   - Runs on pull requests to development branch
   - Validates CloudFormation template
   - Runs tests
   - Requires AWS credentials

2. **CD Pipeline** (`.github/workflows/oauth-cd.yml`):
   - Runs on pushes to development branch
   - Deploys CloudFormation stack
   - Updates Lambda function
   - Requires:
     - AWS credentials
     - GitHub OAuth App credentials
     - API Key

## Required Secrets

Add these secrets to your GitHub repository:

- `AWS_ACCESS_KEY_ID`: AWS access key
- `AWS_SECRET_ACCESS_KEY`: AWS secret key
- `GITHUB_CLIENT_ID`: GitHub OAuth App client ID
- `GITHUB_CLIENT_SECRET`: GitHub OAuth App client secret
- `OAUTH_API_KEY`: API key for the proxy service

## Local Development

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   ```bash
   export GITHUB_CLIENT_ID=your_client_id
   export GITHUB_CLIENT_SECRET=your_client_secret
   export REDIRECT_URI=http://localhost:3000/oauth/auth
   ```

3. Run tests:
   ```bash
   yarn test
   ```

## Integration with Netlify CMS

Update your Netlify CMS configuration to include the API key:

```yaml
backend:
  name: github
  repo: your-username/your-repo
  branch: main
  auth_endpoint: /oauth/auth
  api_endpoint: /oauth/auth
  headers:
    X-API-Key: your-api-key
```

## CloudFormation Outputs

The stack provides these outputs:

- `ProxyUrl`: API Gateway URL for the OAuth proxy
- `ApiId`: API Gateway ID for CloudFront integration
- `ApiEndpoint`: Base URL of the API Gateway
- `ApiStageName`: API Gateway stage name
- `ArtifactBucketName`: S3 bucket for Lambda artifacts
- `ApiKey`: API Key ID for the proxy

## Monitoring

The service includes:

- CloudWatch logs for Lambda function
- API Gateway metrics
- Usage plan monitoring
- Rate limit and quota tracking

## Troubleshooting

Common issues and solutions:

1. **Authentication Fails**
   - Check GitHub OAuth App configuration
   - Verify API key is correct
   - Check CloudWatch logs for errors

2. **Rate Limit Errors**
   - Check usage plan settings
   - Verify API key is being sent correctly
   - Consider increasing quota if needed

3. **Deployment Issues**
   - Check GitHub Actions logs
   - Verify all required secrets are set
   - Check CloudFormation stack events

## Security Considerations

- API keys should be rotated periodically
- Monitor usage patterns for abuse
- Keep dependencies updated
- Review CloudWatch logs regularly
- Consider implementing WAF rules if needed

## Copyright

© 2024 Alex Fischman. All rights reserved.

## License

[Your License Here]