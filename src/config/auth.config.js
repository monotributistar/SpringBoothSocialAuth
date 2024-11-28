const API_URL = import.meta.env.VITE_API_URL;

export const AUTH_ENDPOINTS = {
  github: `${API_URL}${import.meta.env.VITE_GITHUB_AUTH_URL}`,
  google: `${API_URL}${import.meta.env.VITE_GOOGLE_AUTH_URL}`,
};

export const handleLogin = (provider) => {
  window.location.href = AUTH_ENDPOINTS[provider];
};
