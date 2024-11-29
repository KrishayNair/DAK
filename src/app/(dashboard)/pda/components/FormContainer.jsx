export function FormContainer({ children }) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-12">
            {children}
          </div>
        </div>
      </div>
    );
  }