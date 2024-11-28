import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/api.service';

const AuthorizationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateAuth = async () => {
      try {
        const token = searchParams.get('token');
        if (!token) {
          setError('No proporcionó un token. Intente nuevamente.');

          throw new Error('No token provided');
        }

        // Validar el token y obtener información del usuario
        const userData = await authService.validateToken(token);

        if (userData && userData.username) {
          navigate('/', { replace: true });
        } else {
          setError('Error durante la autenticación. Por favor, intente nuevamente.');
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error('Auth error:', error);
      }
    };

    validateAuth();
  }, [searchParams, navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-error">Error de Autenticación</h2>
            <p className="text-error">{error}</p>
            <button
              className="btn btn-primary mt-4"
              onClick={() => navigate('/', { replace: true })}
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Validando autenticación</h2>
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationPage;
