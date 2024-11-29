export function CustomerType({ value, onChange }) {
    const customerTypes = [
      { id: 'individual', label: 'Individual' },
      { id: 'business', label: 'Business' },
      { id: 'institution', label: 'Institution' }
    ];
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Select Customer Type</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {customerTypes.map(type => (
            <button
              key={type.id}
              className={`p-6 rounded-lg border-2 transition-all ${
                value === type.id 
                  ? 'border-secondary bg-secondary/10' 
                  : 'border-gray-200 hover:border-secondary/50'
              }`}
              onClick={() => onChange(type.id)}
            >
              <h3 className="text-xl font-medium">{type.label}</h3>
            </button>
          ))}
        </div>
      </div>
    );
  }