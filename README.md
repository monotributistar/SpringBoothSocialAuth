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
# By default:
VITE_API_URL=http://localhost:8080
VITE_GITHUB_AUTH_URL=/oauth2/authorization/github
VITE_GOOGLE_AUTH_URL=/oauth2/authorization/google
```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
social-auth-demo/
├── src/
│   ├── components/
│   │   └── LoginButtons.jsx    # Social login buttons component
│   ├── config/
│   │   └── auth.config.js      # Authentication configuration
│   ├── App.jsx                 # Main application component
│   └── index.css              # Global styles
├── .env                       # Environment variables
├── .env.example              # Example environment variables
├── package.json              # Project dependencies
└── tailwind.config.js        # Tailwind CSS configuration
```

## Features

- OAuth2 authentication with GitHub and Google
- Modern UI with TailwindCSS and DaisyUI
- Environment variable configuration
- Responsive design
- Easy to customize and extend

## Dependencies

- React 18.x
- Vite 6.x
- TailwindCSS 3.x
- DaisyUI 4.x
- Axios for HTTP requests

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
