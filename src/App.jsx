import LoginButtons from './components/LoginButtons';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold mb-4">Welcome!</h2>
          <p className="mb-6">Please login to continue</p>
          <LoginButtons />
        </div>
      </div>
    </div>
  );
}

export default App;
