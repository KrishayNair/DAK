import { useRouter } from 'next/navigation';

export function Review({ formData }) {
  const router = useRouter();

  // Update the safeFormData structure to match the OrderDetails data
  const safeFormData = {
    customerType: '',
    personalDetails: {
      applicantName: '',
      mailingAddress: '',
      pinCode: '',
      frequency: '',
      detailType: '',
      recipientName: '',
      recipientAddress: '',
      recipientPinCode: '',
    },
    orderDetails: {
      productType: '',
      addedItems: [],
      depositAmount: 0,
    },
    ...formData
  };

  console.log('Review Form Data:', safeFormData); // Add this for debugging

  const handleProceedToPay = () => {
    router.push('/payment');
  };

  const renderForm = () => {
    return (
      <div className="max-w-[21cm] mx-auto bg-white p-8 shadow-none">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold uppercase">Philatelic Deposit Account</h1>
          <h2 className="text-lg uppercase mt-2">Application Form</h2>
          {/* <p className="text-sm mt-2">Simply complete this form and return it to us to set up your mail order account with us.</p> */}
        </div>

        {/* Customer Type */}
        <div className="mb-6">
          <p className="text-sm mb-2">Type of Customer :</p>
          <div className="flex gap-12">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={safeFormData.customerType === 'individual'}
                readOnly
                className="mr-2"
              />
              <span className="text-sm">Private / Individual</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={safeFormData.customerType === 'dealer'}
                readOnly
                className="mr-2"
              />
              <span className="text-sm">Stamp dealer / shop</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={safeFormData.customerType === 'company'}
                readOnly
                className="mr-2"
              />
              <span className="text-sm">Company</span>
            </label>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mb-8">
          <h3 className="font-bold text-sm border-b border-black mb-4">PERSONAL DETAILS</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm">Name of applicant:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.applicantName}
              </div>
            </div>
            <div>
              <p className="text-sm">Mailing Address:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.mailingAddress}
              </div>
            </div>
            <div>
              <p className="text-sm">Pin:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.pinCode}
              </div>
            </div>
            
           

            <h3 className="text-center">And/Or</h3>
            <div>
              <p className="text-sm">I wish to take out a gift subscription in the name of:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.recipientName}
              </div>
            </div>
            <div>
              <p className="text-sm">Mailing Address:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.recipientAddress}
              </div>
            </div>
            <div>
              <p className="text-sm">Pin:</p>
              <div className="border-b border-gray-300 py-1">
                {safeFormData.personalDetails.recipientPinCode}
              </div>
            </div>
          </div>
        </div>

         {/* Frequency Selection */}
         <div className="mt-4 mb-4">
              <p className="text-sm mb-2">Frequency:</p>
              <div className="flex gap-12">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={safeFormData.personalDetails.frequency === 'yearly'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">Once a Year</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={safeFormData.personalDetails.frequency === 'halfYearly'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">Twice a Year</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={safeFormData.personalDetails.frequency === 'quarterly'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">Four times a year</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={safeFormData.personalDetails.frequency === 'bimonthly'}
                    readOnly
                    className="mr-2"
                  />
                  <span className="text-sm">Six times a year</span>
                </label>
              </div>
            </div>

        {/* Order Form */}
        <div>
          <h3 className="font-bold text-sm border-b border-black mb-4">ORDER FORM</h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border border-gray-400 p-2 text-left">ITEM</th>
                <th className="border border-gray-400 p-2 w-24">QUANTITY</th>
                <th className="border border-gray-400 p-2 w-24">TYPE</th>
              </tr>
            </thead>
            <tbody>
              {safeFormData.orderDetails?.addedItems?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{item.name}</td>
                  <td className="border border-gray-400 p-2 text-center">{item.quantity}</td>
                  <td className="border border-gray-400 p-2 text-center">{item.type}</td>
                </tr>
              ))}
              {(!safeFormData.orderDetails?.addedItems || safeFormData.orderDetails.addedItems.length === 0) && (
                <tr>
                  <td colSpan="3" className="border border-gray-400 p-2 text-center text-gray-500">
                    No items added
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Add Deposit Amount Display */}
          <div className="mt-4">
            <p className="text-sm font-medium">Deposit Amount: ₹{safeFormData.orderDetails?.depositAmount || 0}</p>
          </div>
        </div>

        {/* Signature Section */}
        <div className="mt-8">
          <div>
            <p className="text-sm">Date:</p>
            <div className="border-b border-gray-300 w-48 py-1">
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Form View */}
      <div className="min-h-screen bg-gray-50 py-8">
        {renderForm()}
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-8 right-8 print:hidden flex gap-4">
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>Download Form</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>

        <button
          onClick={handleProceedToPay}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <span>Proceed to Pay</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}