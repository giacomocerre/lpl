import React, { useEffect } from 'react';

const ConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  useEffect(() => {
    if (isVisible) {
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          onCancel();
        }
      };

      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isVisible, onCancel]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
      <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
        <p className='text-red-600 text-xl font-bold'>
          <i className="bi bi-x-octagon-fill"></i>
        </p>
        <h2 id="modal-title" className="text-lg font-bold mb-4">Sei sicuro?</h2>
        <p id="modal-description" className="mb-4">Sei sicuro di voler continuare?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded mr-2 hover:bg-red-700"
          >
            Si
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Annulla
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
