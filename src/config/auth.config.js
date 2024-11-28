import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const AUTH_ENDPOINTS = {
  github: `${API_URL}${import.meta.env.VITE_GITHUB_AUTH_URL}`,
  google: `${API_URL}${import.meta.env.VITE_GOOGLE_AUTH_URL}`,
};

// Configuración de axios para incluir credenciales
axios.defaults.withCredentials = true;

export const handleLogin = async (provider) => {
  try {
    // Iniciar el flujo de OAuth2
    window.location.href = AUTH_ENDPOINTS[provider];
  } catch (error) {
    console.error('Error during authentication:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/user`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const handleLogout = async () => {
  try {
    await axios.post(`${API_URL}/api/logout`);
    window.location.href = '/';
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
