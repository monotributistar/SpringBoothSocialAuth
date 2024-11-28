# Social Auth Demo

A React application demonstrating OAuth2 social authentication with GitHub and Google using Vite, TailwindCSS, and DaisyUI.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.x or higher)
- npm (v8.x or higher)
- A running instance of the Spring Boot backend server

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd social-auth-demo
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
# Copy the example environment file
cp .env.example .env

# Edit the .env file with your configuration
VITE_API_URL=http://localhost:8080
VITE_GITHUB_AUTH_URL=/oauth2/authorization/github
VITE_GOOGLE_AUTH_URL=/oauth2/authorization/google
VITE_API_USER_INFO=/oauth2/me
VITE_FRONTEND_AUTH=/authorization
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
social-auth-demo/
├── src/
│   ├── components/
│   │   ├── LoginButtons.jsx    # Social login buttons component
│   │   └── Modal.jsx          # Modal component for user info
│   ├── pages/
│   │   ├── LoginPage.jsx      # Main login page
│   │   └── AuthorizationPage.jsx # OAuth callback handler
│   ├── services/
│   │   └── api.service.js     # API and authentication services
│   ├── App.jsx               # Main application component
│   └── index.css            # Global styles
├── .env                     # Environment variables
├── .env.example            # Example environment variables
├── package.json            # Project dependencies
├── postcss.config.js       # PostCSS configuration
└── tailwind.config.js      # Tailwind CSS configuration
```

## Features

- OAuth2 authentication with GitHub and Google
- Token-based authentication
- Persistent session management
- Modern UI with TailwindCSS and DaisyUI
- Environment variable configuration
- Responsive design
- Loading states and error handling
- User session management

## Routes

- `/` - Main login page with social authentication options
- `/authorization` - OAuth callback handler page

## API Endpoints

- `${VITE_API_URL}/oauth2/authorization/github` - GitHub OAuth2 authorization
- `${VITE_API_URL}/oauth2/authorization/google` - Google OAuth2 authorization
- `${VITE_API_URL}/oauth2/me` - Get authenticated user information

## Dependencies

### Core

- React 18.x
- Vite 6.x
- React Router DOM 7.x

### Styling

- TailwindCSS 3.x
- DaisyUI 4.x
- PostCSS 8.x
- Autoprefixer 10.x

### HTTP Client

- Axios 1.x

### Testing

- Vitest
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- jsdom (for DOM environment in tests)

### Development

- @types/react 18.x
- @types/react-dom 18.x
- @vitejs/plugin-react 4.x
- ESLint 9.x
  - eslint-plugin-react 7.x
  - eslint-plugin-react-hooks 4.x
  - eslint-plugin-react-refresh 0.4.x

## Testing

The project includes a comprehensive test suite using Vitest and React Testing Library. Tests are organized by component and service.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate test coverage report
npm run test:coverage
```

### Test Structure

```
src/
├── test/
│   ├── setup.js              # Test setup and global mocks
│   ├── LoginButtons.test.jsx # Tests for LoginButtons component
│   └── api.service.test.js   # Tests for authentication service
```

### Test Coverage

Tests cover:

- Component rendering and interactions
- Authentication service methods
- Token management
- API calls
- Error handling
- Loading states
- User session management

## Authentication Flow

1. User clicks on a social login button (GitHub/Google)
2. User is redirected to the OAuth provider
3. After successful authentication, the provider redirects back to `/authorization`
4. The application validates the token and retrieves user information
5. User session is established and stored in localStorage
6. User is redirected to the main application

## Security Features

- Token-based authentication
- Secure token storage in localStorage
- CORS configuration for API requests
- HTTP-only cookies support
- Automatic token injection in API requests
- Session persistence
- Secure logout handling

## License

This project is licensed under the MIT License - see the LICENSE file for details.
