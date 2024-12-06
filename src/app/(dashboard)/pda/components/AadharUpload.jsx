// src/app/(dashboard)/pda/components/AadharUpload.jsx
import React, { useState, useEffect } from "react";

export function AadharUpload({ formData = {}, updateFormData }) {
  // Fallback to empty object
  const [aadharNumber, setAadharNumber] = useState(formData.aadharNumber || "");
  const [image, setImage] = useState(formData.aadharImage || null);

  useEffect(() => {
    // Make sure aadharDetails is always initialized with proper values
    if (!formData.aadharNumber) setAadharNumber("");
    if (!formData.aadharImage) setImage(null);
  }, [formData]);

  const handleAadharChange = (e) => {
    setAadharNumber(e.target.value);
    updateFormData("aadharDetails", {
      ...formData,
      aadharNumber: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
    updateFormData("aadharDetails", { ...formData, aadharImage: file });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Aadhar Card Details</h2>
      <div>
        <label htmlFor="aadhar-number" className="block mb-2">
          Aadhar Number
        </label>
        <input
          type="text"
          id="aadhar-number"
          value={aadharNumber}
          onChange={handleAadharChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter Aadhar Number"
        />
      </div>
      <div>
        <label htmlFor="aadhar-image" className="block mb-2">
          Upload Aadhar Image
        </label>
        <input
          type="file"
          id="aadhar-image"
          accept="image/*"
          onChange={handleImageUpload}
          className="p-2"
        />
        {image && (
          <div className="mt-4">
            <h3>Uploaded Image:</h3>
            <img src={image} alt="Aadhar Card" className="max-w-xs mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
