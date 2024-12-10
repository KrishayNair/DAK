export function PersonalDetails({ details = {}, onChange }) {
  const handleChange = (field, value) => {
    onChange({
      ...details,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Applicant Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <input
          type="text"
          value={details.applicantName || ''}
          onChange={(e) => handleChange('applicantName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your full name as per ID proof"
        />
      </div>

      {/* Mailing Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mailing Address *
        </label>
        <textarea
          value={details.mailingAddress || ''}
          onChange={(e) => handleChange('mailingAddress', e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your complete mailing address"
        />
      </div>

      {/* PIN Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          PIN Code *
        </label>
        <input
          type="text"
          value={details.pinCode || ''}
          onChange={(e) => handleChange('pinCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter 6-digit PIN code"
          maxLength={6}
        />
      </div>

      {/* Frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Frequency *
        </label>
        <select
          value={details.frequency || ''}
          onChange={(e) => handleChange('frequency', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select frequency</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="halfYearly">Half Yearly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Helper Text */}
      <div className="text-sm text-gray-500">
        <p>* Required fields</p>
        <p>Please ensure your mailing address is complete and accurate for delivery.</p>
      </div>
    </div>
  );
}