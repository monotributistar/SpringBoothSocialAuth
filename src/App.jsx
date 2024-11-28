import { useState } from 'react';
import axios from 'axios';
import Modal from './components/Modal';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState('');

  const handleAuth = async (provider) => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/${provider}`);

      if (response.data.success) {
        const userResponse = await axios.get('http://localhost:8080/oauth/me');
        setUsername(userResponse.data.username);
        setShowModal(true);
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      alert('Error durante la autenticación');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold mb-6 text-primary">Iniciar Sesión</h2>
          <div className="flex flex-col gap-4 w-full">
            <button
              className="btn btn-primary hover:btn-primary-focus gap-2"
              onClick={() => handleAuth('google')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-google"
                viewBox="0 0 16 16"
              >
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
              </svg>
              Iniciar con Google
            </button>
            <button
              className="btn btn-secondary hover:btn-secondary-focus gap-2"
              onClick={() => handleAuth('github')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-github"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
              </svg>
              Iniciar con GitHub
            </button>
          </div>
          <div className="divider my-6">O</div>
          <p className="text-sm text-base-content/70">Selecciona un método de inicio de sesión para continuar</p>
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        username={username}
      />
    </div>
  );
}

export default App;
