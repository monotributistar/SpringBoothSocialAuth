import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock de window.location
delete window.location;
window.location = {
  href: '',
  reload: vi.fn(),
};

// Limpiar mocks después de cada test
afterEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});
