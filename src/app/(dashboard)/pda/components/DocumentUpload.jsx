import React, { useState } from 'react';

export function DocumentUpload({ documents = {}, onChange }) {
  const [errors, setErrors] = useState({});

  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    
    // Validate file
    if (file) {
      // Check file type
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({
          ...prev,
          [type]: 'Only PDF files are allowed'
        }));
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [type]: 'File size should be less than 5MB'
        }));
        return;
      }

      // Clear error if previously set
      setErrors(prev => ({
        ...prev,
        [type]: null
      }));

      // Update the documents state
      onChange({
        ...documents,
        [type]: {
          file,
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
    }
  };

  const removeFile = (type) => {
    onChange({
      ...documents,
      [type]: null
    });
  };

  const renderFileInfo = (type) => {
    const doc = documents[type];
    if (!doc) return null;

    return (
      <div className="flex items-center space-x-2 mt-2 bg-blue-50 p-2 rounded-md">
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="text-sm text-blue-700 truncate">{doc.name}</span>
        <button
          onClick={() => removeFile(type)}
          className="text-red-500 hover:text-red-600"
          type="button"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Document Upload</h2>
        <p className="mt-2 text-gray-600">Please upload your ID and address proof documents</p>
      </div>

      <div className="space-y-8">
        {/* ID Proof Upload */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              ID Proof
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'idProof')}
                  />
                </label>
              </div>
            </div>
            {renderFileInfo('idProof')}
            {errors.idProof && (
              <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Upload a valid government-issued ID proof (Aadhar Card, PAN Card, etc.)
            </p>
          </div>
        </div>

        {/* Address Proof Upload */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Address Proof
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="mt-1">
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PDF only (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf"
                    onChange={(e) => handleFileChange(e, 'addressProof')}
                  />
                </label>
              </div>
            </div>
            {renderFileInfo('addressProof')}
            {errors.addressProof && (
              <p className="text-red-500 text-sm mt-1">{errors.addressProof}</p>
            )}
            <p className="text-sm text-gray-500 mt-2">
              Upload a valid address proof (Utility Bill, Bank Statement, etc.)
            </p>
          </div>
        </div>

        {/* Required Fields Note */}
        <div className="text-sm text-gray-500 italic">
          <span className="text-red-500">*</span> Required documents
        </div>
      </div>
    </div>
  );
}