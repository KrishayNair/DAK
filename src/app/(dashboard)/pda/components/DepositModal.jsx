export function DepositModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
          <h3 className="text-xl font-semibold mb-4">Minimum Deposit Required</h3>
          <p className="text-gray-600 mb-6">
            Please note that a minimum deposit of ₹200 is required to proceed with the application.
          </p>
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    );
  }