export function PersonalDetails({ details, onChange }) {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      onChange({
        ...details,
        [name]: value
      });
    };
  
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
        <div className="grid gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Applicant Name</label>
            <input
              type="text"
              name="applicantName"
              value={details.applicantName}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Mailing Address</label>
            <textarea
              name="mailingAddress"
              value={details.mailingAddress}
              onChange={handleInputChange}
              rows={3}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">PIN Code</label>
            <input
              type="text"
              name="pinCode"
              value={details.pinCode}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Frequency</label>
            <select
              name="frequency"
              value={details.frequency}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select Frequency</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>
      </div>
    );
  }