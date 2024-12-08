export function Review({ formData }) {
  const renderOrderSummary = () => {
    const addedItems = formData.orderDetails.addedItems || [];

    if (addedItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <p className="text-gray-500">No items added to your order</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {addedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.type}</p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Qty: {item.quantity}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderDocumentPreview = (document, title) => {
    if (!document) return null;

    return (
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500">{document.name}</p>
          </div>
          <a
            href={URL.createObjectURL(document.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            View PDF
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review Your Application</h2>
        <p className="text-gray-600">Please verify all the information before proceeding to payment</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Personal Information Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Personal Details</h3>
              <p className="text-sm text-gray-500">Your contact information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-medium">{formData.personalDetails.applicantName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{formData.personalDetails.mailingAddress}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">PIN Code</p>
              <p className="font-medium">{formData.personalDetails.pinCode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Frequency</p>
              <p className="font-medium capitalize">{formData.personalDetails.frequency}</p>
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Order Summary</h3>
              <p className="text-sm text-gray-500">Items in your order</p>
            </div>
          </div>
          {renderOrderSummary()}
        </div>

        {/* Documents Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Uploaded Documents</h3>
              <p className="text-sm text-gray-500">Your identification and address proof</p>
            </div>
          </div>
          <div className="space-y-4">
            {renderDocumentPreview(formData.documents.idProof, 'ID Proof')}
            {renderDocumentPreview(formData.documents.addressProof, 'Address Proof')}
          </div>
        </div>

        {/* Deposit Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow md:col-span-2">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Deposit Details</h3>
              <p className="text-sm text-gray-500">Your deposit amount</p>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₹{formData.depositAmount}</span>
              <span className="ml-2 text-sm text-gray-500">(Minimum ₹200)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}