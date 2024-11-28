import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Configurar axios
axios.defaults.withCredentials = true;

// Interceptor para agregar el token a las peticiones
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  // Manejo de token
  setAuthToken: (token) => {
    if (token) {
      localStorage.setItem('auth_token', token);
    }
  },

  getAuthToken: () => {
    return localStorage.getItem('auth_token');
  },

  // Manejo de username
  setUsername: (username) => {
    if (username) {
      localStorage.setItem('username', username);
    }
  },

  getUsername: () => {
    return localStorage.getItem('username');
  },

  // Limpiar datos de autenticación
  clearAuthData: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
  },

  // Iniciar el flujo de OAuth2
  initiateOAuth: (provider) => {
    const authUrl = `${API_URL}${import.meta.env[`VITE_${provider.toUpperCase()}_AUTH_URL`]}`;
    window.location.href = authUrl;
  },

  // Obtener información del usuario autenticado
  getUserInfo: async () => {
    try {
      const response = await axios.get(`${API_URL}${import.meta.env.VITE_API_USER_INFO}`);
      if (response.data && response.data.username) {
        authService.setUsername(response.data.username);
      }
      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  },

  // Cerrar sesión
  logout: async () => {
    try {
      //   await axios.post(`${API_URL}/api/logout`);
      authService.clearAuthData();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },

  // Validar token y obtener información del usuario
  validateToken: async (token) => {
    try {
      const response = await axios.get(`${API_URL}${import.meta.env.VITE_API_USER_INFO}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.username) {
        authService.setAuthToken(token);
        authService.setUsername(response.data.username);
      }

      return response.data;
    } catch (error) {
      console.error('Error validating token:', error);
      throw error;
    }
  },
};
