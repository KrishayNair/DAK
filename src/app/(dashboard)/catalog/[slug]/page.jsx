"use client";
import { useParams } from "next/navigation";
import { Elsie_Swash_Caps } from "next/font/google";
import { QRCodeSVG } from 'qrcode.react';
import Image from "next/image";

// Import the stamp data from the parent directory
import { stampDetails, stampImages } from "../page";

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ["latin"],
  weight: ["400"],
});

const InfoCard = ({ label, value }) => (
  <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-6 rounded-xl shadow-sm border border-gray-100">
    <p className="text-sm text-gray-600 mb-2 font-medium">{label}</p>
    <p className="font-semibold text-gray-800">{value}</p>
  </div>
);

const DetailSection = ({ title, children }) => (
  <div className="mb-8">
    <h3 className={`text-2xl font-semibold text-gray-800 mb-4 ${elsieSwashCaps.className}`}>{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

export default function StampDetail() {
  const params = useParams();
  const stampIndex = parseInt(params.slug);
  const stamp = stampDetails[stampIndex];
  const stampImage = stampImages[stampIndex];

  // Get the current URL for QR code
  const currentURL = typeof window !== 'undefined' ? window.location.href : '';

  if (!stamp) return <div>Stamp not found</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left: Image Section */}
            <div className="md:w-1/2">
              <div className="relative w-3/4 mx-auto aspect-square rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={`/${stampImage}`}
                  alt={stamp.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-sm font-medium text-gray-800">
                    Dimensions: {stamp.dimensions}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Basic Info */}
            <div className="md:w-1/2">
              <h1 className={`text-4xl md:text-5xl font-bold text-gray-800 mb-6 ${elsieSwashCaps.className}`}>
                {stamp.name}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{stamp.caption}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-3 mb-10">
                <span className="px-6 py-2.5 bg-amber-50 text-amber-800 rounded-full font-medium hover:bg-amber-100 transition-colors">
                  {stamp.rarity}
                </span>
                <span className="px-6 py-2.5 bg-emerald-50 text-emerald-800 rounded-full font-medium hover:bg-emerald-100 transition-colors">
                  {stamp.condition}
                </span>
                <span className="px-6 py-2.5 bg-blue-50 text-blue-800 rounded-full font-medium hover:bg-blue-100 transition-colors">
                  Year: {stamp.year}
                </span>
                <span className="px-6 py-2.5 bg-purple-50 text-purple-800 rounded-full font-medium hover:bg-purple-100 transition-colors">
                  Value: {stamp.marketValue}
                </span>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <InfoCard label="Denomination" value={stamp.denomination} />
                <InfoCard label="Color" value={stamp.color} />
                <InfoCard label="Postal Circle" value={stamp.postalCircle} />
                <InfoCard label="Units Produced" value={stamp.unitsProduced} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Historical Context */}
          <DetailSection title="Historical Context">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors">
              <p className="text-gray-700 leading-relaxed">{stamp.historicalContext}</p>
            </div>
          </DetailSection>

          {/* Backstory */}
          <DetailSection title="Backstory">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors">
              <p className="text-gray-700 leading-relaxed">{stamp.backstory}</p>
            </div>
          </DetailSection>

          {/* Technical Details */}
          <DetailSection title="Technical Specifications">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard label="Printing Method" value={stamp.printingMethod} />
              <InfoCard label="Designer" value={stamp.designer} />
              <InfoCard label="Paper Type" value={stamp.paperType} />
              <InfoCard label="Perforations" value={stamp.perforations} />
              <InfoCard label="Printing House" value={stamp.printingHouse} />
              <InfoCard label="Certificate of Authenticity" value={stamp.certificateOfAuthenticity} />
            </div>
          </DetailSection>
        </div>
      </div>

      {/* Share Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          <DetailSection title="Share This Stamp">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm border border-gray-100 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-white p-4 rounded-xl shadow-md">
                  <QRCodeSVG
                    value={currentURL}
                    size={200}
                    level="H"
                    includeMargin={true}
                    className="mx-auto"
                  />
                </div>
                <p className="text-gray-600 text-center mt-4">
                  Scan this QR code to share this stamp&apos;s details
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={currentURL}
                    readOnly
                    className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm w-full"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(currentURL);
                      alert('Link copied to clipboard!');
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </DetailSection>
        </div>
      </div>
    </div>
  );
}
