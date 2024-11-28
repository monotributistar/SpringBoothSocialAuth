import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, username }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="modal-box relative bg-base-100 rounded-lg shadow-lg">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-bold text-lg mb-4">¡Bienvenido!</h3>
        <p className="py-4">
          Has iniciado sesión como <span className="font-semibold text-primary">{username}</span>
        </p>
        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={onClose}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default Modal;
