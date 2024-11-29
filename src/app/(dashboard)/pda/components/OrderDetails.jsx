export function OrderDetails({ details, onChange }) {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onChange({
        ...details,
        [name]: value
      });
    };
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Type</label>
            <select
              name="productType"
              value={details.productType}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Product Type</option>
              <option value="stamps">Stamps</option>
              <option value="coins">Coins</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={details.quantity}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }