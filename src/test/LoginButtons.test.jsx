import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LoginButtons from '../components/LoginButtons';
import { authService } from '../services/api.service';

// Mock del servicio de autenticación
vi.mock('../services/api.service', () => ({
  authService: {
    getUserInfo: vi.fn(),
    initiateOAuth: vi.fn(),
    logout: vi.fn(),
  },
}));

describe('LoginButtons', () => {
  it('renders login buttons when user is not authenticated', async () => {
    authService.getUserInfo.mockResolvedValueOnce(null);

    render(<LoginButtons />);

    // Esperar a que los botones se muestren
    const githubButton = await screen.findByText(/Login with GitHub/i);
    const googleButton = await screen.findByText(/Login with Google/i);

    expect(githubButton).toBeInTheDocument();
    expect(googleButton).toBeInTheDocument();
  });

  it('renders welcome message when user is authenticated', async () => {
    const mockUser = { username: 'testuser' };
    authService.getUserInfo.mockResolvedValueOnce(mockUser);

    render(<LoginButtons />);

    // Esperar a que se muestre el mensaje de bienvenida
    const welcomeMessage = await screen.findByText('¡Bienvenido!');
    const username = await screen.findByText('testuser');
    const logoutButton = await screen.findByText(/Cerrar Sesión/i);

    expect(welcomeMessage).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });

  it('calls initiateOAuth when clicking GitHub button', async () => {
    authService.getUserInfo.mockResolvedValueOnce(null);

    render(<LoginButtons />);

    const githubButton = await screen.findByText(/Login with GitHub/i);
    fireEvent.click(githubButton);

    expect(authService.initiateOAuth).toHaveBeenCalledWith('github');
  });

  it('calls initiateOAuth when clicking Google button', async () => {
    authService.getUserInfo.mockResolvedValueOnce(null);

    render(<LoginButtons />);

    const googleButton = await screen.findByText(/Login with Google/i);
    fireEvent.click(googleButton);

    expect(authService.initiateOAuth).toHaveBeenCalledWith('google');
  });

  it('calls logout when clicking logout button', async () => {
    const mockUser = { username: 'testuser' };
    authService.getUserInfo.mockResolvedValueOnce(mockUser);

    render(<LoginButtons />);

    const logoutButton = await screen.findByText(/Cerrar Sesión/i);
    fireEvent.click(logoutButton);

    expect(authService.logout).toHaveBeenCalled();
  });

  it('shows loading spinner while checking auth status', () => {
    authService.getUserInfo.mockImplementationOnce(() => new Promise(() => {}));

    render(<LoginButtons />);

    const loadingSpinner = screen.getByTestId('loading-spinner');
    expect(loadingSpinner).toBeInTheDocument();
  });
});
