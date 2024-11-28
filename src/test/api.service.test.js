import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { authService } from '../services/api.service';

// Mock de axios
vi.mock('axios');

describe('authService', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('token management', () => {
    it('should set and get auth token', () => {
      const token = 'test-token';
      authService.setAuthToken(token);
      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', token);
    });

    it('should get auth token', () => {
      localStorage.getItem.mockReturnValueOnce('test-token');
      const token = authService.getAuthToken();
      expect(token).toBe('test-token');
    });

    it('should clear auth data', () => {
      authService.clearAuthData();
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('username');
    });
  });

  describe('username management', () => {
    it('should set and get username', () => {
      const username = 'testuser';
      authService.setUsername(username);
      expect(localStorage.setItem).toHaveBeenCalledWith('username', username);
    });

    it('should get username', () => {
      localStorage.getItem.mockReturnValueOnce('testuser');
      const username = authService.getUsername();
      expect(username).toBe('testuser');
    });
  });

  describe('API calls', () => {
    it('should initiate OAuth flow', () => {
      authService.initiateOAuth('github');
      expect(window.location.href).toContain('/oauth2/authorization/github');
    });

    it('should get user info', async () => {
      const mockUser = { username: 'testuser' };
      axios.get.mockResolvedValueOnce({ data: mockUser });

      const user = await authService.getUserInfo();
      expect(user).toEqual(mockUser);
      expect(localStorage.setItem).toHaveBeenCalledWith('username', mockUser.username);
    });

    it('should handle getUserInfo error', async () => {
      const error = new Error('API Error');
      axios.get.mockRejectedValueOnce(error);

      await expect(authService.getUserInfo()).rejects.toThrow('API Error');
    });

    it('should validate token', async () => {
      const token = 'test-token';
      const mockUser = { username: 'testuser' };
      axios.get.mockResolvedValueOnce({ data: mockUser });

      const user = await authService.validateToken(token);
      expect(user).toEqual(mockUser);
      expect(localStorage.setItem).toHaveBeenCalledWith('auth_token', token);
      expect(localStorage.setItem).toHaveBeenCalledWith('username', mockUser.username);
    });

    it('should handle validateToken error', async () => {
      const error = new Error('Invalid Token');
      axios.get.mockRejectedValueOnce(error);

      await expect(authService.validateToken('invalid-token')).rejects.toThrow('Invalid Token');
    });

    it('should handle logout', async () => {
      await authService.logout();
      expect(localStorage.removeItem).toHaveBeenCalledWith('auth_token');
      expect(localStorage.removeItem).toHaveBeenCalledWith('username');
    });
  });
});
