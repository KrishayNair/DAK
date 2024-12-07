// src/app/(dashboard)/pda/components/GeneratePDF.jsx
import React from "react";
// import { jsPDF } from "jspdf";

export function GeneratePDF({ formData }) {
  const generatePdf = () => {
    const doc = new jsPDF();

    doc.text("Philatelic Deposit Account Application", 20, 20);
    doc.text(`Customer Type: ${formData.customerType}`, 20, 30);
    doc.text(`Name: ${formData.personalDetails.applicantName}`, 20, 40);
    doc.text(`Address: ${formData.personalDetails.mailingAddress}`, 20, 50);
    doc.text(`Pin Code: ${formData.personalDetails.pinCode}`, 20, 60);
    doc.text(`Aadhar Number: ${formData.aadharDetails.aadharNumber}`, 20, 70);
    doc.text(`Deposit Amount: ₹${formData.depositAmount}`, 20, 80);

    doc.save("Philatelic_Deposit_Application.pdf");
  };

  return (
    <div>
      <button
        onClick={generatePdf}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Generate PDF
      </button>
    </div>
  );
}
