import React, { useState, useEffect } from 'react';

export function DocumentUpload({ documents = {}, onChange, onValidityChange }) {
  const [errors, setErrors] = useState({});
  const [previews, setPreviews] = useState({
    idProof: null,
    panCard: null
  });

  const handleFileChange = async (type, file) => {
    try {
      if (!file) {
        return;
      }

      // Validate file type
      if (!file.type.match('application/pdf')) {
        setErrors(prev => ({
          ...prev,
          [type]: 'Only PDF files are allowed'
        }));
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [type]: 'File size should not exceed 5MB'
        }));
        return;
      }

      // Clear any previous errors
      setErrors(prev => ({
        ...prev,
        [type]: null
      }));

      // Create object URL for preview
      const previewUrl = URL.createObjectURL(file);
      setPreviews(prev => ({
        ...prev,
        [type]: previewUrl
      }));

      // Update documents state
      onChange({
        ...documents,
        [type]: {
          file,
          name: file.name,
          url: previewUrl
        }
      });

    } catch (error) {
      console.error('Error handling file:', error);
      setErrors(prev => ({
        ...prev,
        [type]: 'Error processing file'
      }));
    }
  };

  const renderDocumentPreview = (document) => {
    if (!document?.url) return null;

    return (
      <div className="mt-4 border rounded-lg overflow-hidden">
        <iframe
          src={document.url}
          className="w-full h-[400px]"
          title="PDF Preview"
        />
      </div>
    );
  };

  const renderDocumentUpload = (type, title, description) => {
    const document = documents[type];
    const error = errors[type];

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-sm font-medium text-gray-900">{title}</h4>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
        </div>

        {document?.file ? (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{document.name}</p>
                  <p className="text-sm text-gray-500">PDF Document</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      onChange({
                        ...documents,
                        [type]: null
                      });
                      setPreviews(prev => ({
                        ...prev,
                        [type]: null
                      }));
                      if (document.url) {
                        URL.revokeObjectURL(document.url);
                      }
                    }}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            {renderDocumentPreview(document)}
          </div>
        ) : (
          <div className="relative">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFileChange(type, e.target.files?.[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="mt-1 text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="mt-1 text-xs text-gray-500">PDF only (max 5MB)</p>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  };

  // Cleanup previews when component unmounts
  useEffect(() => {
    return () => {
      Object.values(documents).forEach(doc => {
        if (doc?.url) {
          URL.revokeObjectURL(doc.url);
        }
      });
    };
  }, [documents]);

  // Update validity whenever documents or errors change
  useEffect(() => {
    const hasIdProof = documents.idProof?.file;
    const hasPanCard = documents.panCard?.file;
    const hasNoErrors = !errors.idProof && !errors.panCard;
    const isValid = hasIdProof && hasPanCard && hasNoErrors;
    onValidityChange(isValid);
  }, [documents, errors, onValidityChange]);

  return (
    <div className="space-y-8">
      {renderDocumentUpload(
        'idProof',
        'Aadhaar Card',
        'Upload a clear copy of your Aadhaar Card'
      )}
      
      {renderDocumentUpload(
        'panCard',
        'PAN Card',
        'Upload a clear copy of your PAN Card'
      )}

      <div className="text-sm text-gray-500">
        <p>* Both documents are required</p>
        <p>* Only PDF files are accepted</p>
        <p>* Maximum file size: 5MB</p>
      </div>
    </div>
  );
}