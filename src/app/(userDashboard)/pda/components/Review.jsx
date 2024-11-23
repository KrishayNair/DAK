export function Review({ formData, onDepositChange }) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Review Your Details</h2>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium mb-2">Customer Type</h3>
            <p className="capitalize">{formData.customerType}</p>
          </div>
  
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium mb-2">Personal Details</h3>
            <div className="grid gap-2">
              <p>Name: {formData.personalDetails.applicantName}</p>
              <p>Address: {formData.personalDetails.mailingAddress}</p>
              <p>PIN Code: {formData.personalDetails.pinCode}</p>
              <p>Frequency: {formData.personalDetails.frequency}</p>
            </div>
          </div>
  
          <div className="bg-white p-4 rounded-lg">
            <h3 className="font-medium mb-2">Deposit Amount</h3>
            <input
              type="number"
              value={formData.depositAmount}
              onChange={(e) => onDepositChange(e.target.value)}
              className="w-full p-3 border rounded-lg"
              placeholder="Minimum ₹200"
            />
          </div>
        </div>
      </div>
    );
  }