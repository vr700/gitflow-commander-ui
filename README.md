
# GitFlow Commander

A tool to help developers manage their GitFlow process.

## Features

- Generate Git commands for your workflow
- Support for both SSH and HTTPS repositories
- Pull Request guidance
- SSH Keys setup guide

## Deployment to GitHub Pages

This project is configured for easy deployment to GitHub Pages.

### Automatic Deployment

When you push to the main branch, a GitHub Action will automatically build and deploy the app to GitHub Pages.

### Manual Deployment

To deploy manually:

1. Build the project:
   ```
   npm run build
   ```

2. Deploy to GitHub Pages:
   ```
   npm install -g gh-pages
   gh-pages -d dist
   ```

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## License

MIT
