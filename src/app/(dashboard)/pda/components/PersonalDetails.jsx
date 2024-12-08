export function PersonalDetails({ details = {}, onChange }) {
  // Initialize default values if details is undefined
  const defaultDetails = {
    applicantName: "",
    mailingAddress: "",
    pinCode: "",
    frequency: "",
    detailType: "",
  };

  // Merge provided details with default values
  const formDetails = { ...defaultDetails, ...details };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...formDetails,
      [name]: value
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Personal Details</h2>
        <p className="mt-2 text-gray-600">Please provide your contact information for the application</p>
      </div>

      <div className="space-y-6">
        {/* Applicant Name */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Applicant Name
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="applicantName"
              value={formDetails.applicantName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400"
            />
          </div>
        </div>

        {/* Mailing Address */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Mailing Address
              <span className="text-red-500 ml-1">*</span>
            </label>
            <textarea
              name="mailingAddress"
              value={formDetails.mailingAddress}
              onChange={handleInputChange}
              rows={3}
              placeholder="Enter your complete mailing address"
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400 resize-none"
            />
            <p className="text-sm text-gray-500">
              Please provide your complete address including street, city, and state
            </p>
          </div>
        </div>

        {/* PIN Code */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              PIN Code
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="pinCode"
              value={formDetails.pinCode}
              onChange={handleInputChange}
              placeholder="Enter 6-digit PIN code"
              maxLength="6"
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400"
            />
            <p className="text-sm text-gray-500">
              Enter your 6-digit postal PIN code
            </p>
          </div>
        </div>

        {/* Frequency */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Subscription Frequency
              <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              name="frequency"
              value={formDetails.frequency}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors hover:border-gray-400 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.75rem center',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="">Select Frequency</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
            <p className="text-sm text-gray-500">
              Choose how often you would like to receive updates
            </p>
          </div>
        </div>

        {/* Required Fields Note */}
        <div className="text-sm text-gray-500 italic">
          <span className="text-red-500">*</span> Required fields
        </div>
      </div>
    </div>
  );
}