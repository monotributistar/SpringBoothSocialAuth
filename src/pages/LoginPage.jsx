import { useState, useEffect } from 'react';
import LoginButtons from '../components/LoginButtons';
import Modal from '../components/Modal';
import { authService } from '../services/api.service';

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const userData = await authService.getUserInfo();
        const storedUsername = authService.getUsername();

        if (userData && userData.username && storedUsername && userData.username !== storedUsername) {
          setUsername(userData.username);
          setShowModal(true);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="flex flex-col items-center gap-4">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="text-lg font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl font-bold mb-4">OAuth Demo</h2>
            <p className="mb-6">Seleccione un método de autenticación para continuar</p>
            <LoginButtons />
          </div>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        username={username}
      />
    </>
  );
};

export default LoginPage;
