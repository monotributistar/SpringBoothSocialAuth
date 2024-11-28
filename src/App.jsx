import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AuthorizationPage from './pages/AuthorizationPage';

const FRONTEND_AUTH = import.meta.env.VITE_FRONTEND_AUTH;

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path={FRONTEND_AUTH}
          element={<AuthorizationPage />}
        />
        <Route
          path="/"
          element={<LoginPage />}
        />
      </Routes>
    </Router>
  );
}

export default App;
