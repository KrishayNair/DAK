"use client"
import React, { useState } from 'react';
import Image from 'next/image'
import pda from "../../../../public/heronew.png"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Elsie_Swash_Caps } from 'next/font/google';

const elsieSwashCaps = Elsie_Swash_Caps({
  subsets: ['latin'],
  weight: ['400'],
});

import { Button } from "@/components/ui/button"

const steps = ['Type of customers', 'Personal Details', 'Order Details', 'Review', 'Confirmation'];

export default function PDAPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [customerType, setCustomerType] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [personalDetails, setPersonalDetails] = useState({
    applicantName: '',
    mailingAddress: '',
    pinCode: '',
    frequency: '',
    detailType: '' // Add this line
  });
  const [orderDetails, setOrderDetails] = useState({
    mintCommemorative: 0,
    mintCommemorative2: 0,
    mintDefinitive: 0,
    topMarginal: 0,
    bottomMarginal: 0,
    fullSheet: 0,
    fdcAffixed: 0,
    fdcWithoutPersonality: 0,
    fdcBlank: 0,
    brochureAffixed: 0,
    brochureBlank: 0,
    annualStampPack: 0,
    specialAnnualPersonalities: 0,
    childrenSpecialAnnual: 0,
    specialCollectorThematics: 0,
    firstDayCoverAnnualThematic: 0,
    postalStationary: 0,
    miniSouvenirSheet: 0,
    anyOtherItemName: '',
    anyOtherItem: 0,
  });
  const [selectedPack, setSelectedPack] = useState('Pack 1');
  const [otherItemQuantity, setOtherItemQuantity] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextStep = () => {
    if (currentStep === 3 && (!depositAmount || depositAmount < 200)) {
      setIsModalOpen(true);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleInputChange = (name, value) => {
    setPersonalDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderChange = (itemId, change) => {
    setOrderDetails(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handlePackChange = (e) => {
    setSelectedPack(e.target.value);
    if (e.target.value !== 'Any Other Item') {
      setOtherItemQuantity('');
    }
  };

  const handleOtherItemChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setOtherItemQuantity(value);
    }
  };

  const renderTypeOfCustomers = () => (
    <div className="space-y-4 mb-14">
      <h2 className="text-xl font-semibold mb-6">{steps[currentStep]}</h2>
      <label className="flex items-center space-x-2">
        <input 
          type="radio" 
          name="customerType" 
          value="private" 
          checked={customerType === 'private'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio" 
        />
        <span>Private / Individual</span>
      </label>
      <label className="flex items-center space-x-2">
        <input 
          type="radio" 
          name="customerType" 
          value="dealer"
          checked={customerType === 'dealer'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio" 
        />
        <span>Stamp Dealer / Shop</span>
      </label>
      <label className="flex items-center space-x-2">
        <input 
          type="radio" 
          name="customerType" 
          value="company"
          checked={customerType === 'company'}
          onChange={(e) => setCustomerType(e.target.value)}
          className="form-radio" 
        />
        <span>Company</span>
      </label>
    </div>
  );

  const renderPersonalDetails = () => (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Personal Details</h2>
        <select 
          className="border rounded p-2"
          name="detailType"
          value={personalDetails.detailType || ''}
          onChange={(e) => handleInputChange('detailType', e.target.value)}
        >
          <option value="">Select</option>
          <option value="personal">Personal</option>
          <option value="gift">Gift</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Applicant Name *</label>
        <input
          type="text"
          name="applicantName"
          value={personalDetails.applicantName}
          onChange={(e) => handleInputChange('applicantName', e.target.value)}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Mailing Address *</label>
        <textarea
          name="mailingAddress"
          value={personalDetails.mailingAddress}
          onChange={(e) => handleInputChange('mailingAddress', e.target.value)}
          rows="2"
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="flex justify-between">
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700">Pin Code *</label>
          <input
            type="text"
            name="pinCode"
            value={personalDetails.pinCode}
            onChange={(e) => handleInputChange('pinCode', e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
      </div>
      <div className='z-10'>
        <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
        <div className="flex space-x-4 ">
          {['Once a Year', 'Twice a Year', 'Four times a Year', 'Six times a Year'].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name="frequency"
                value={option}
                checked={personalDetails.frequency === option}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const handleCheckout = () => {
    if (depositAmount >= 200) {
      // Proceed to the next step or checkout process
      nextStep();
    } else {
      setIsModalOpen(true);
    }
  };

  const renderReview = () => {
    const itemNames = {
      mintCommemorative: 'Mint Commemorative Stamps',
      mintCommemorative2: 'Mint Commemorative Stamps without personalities series',
      mintDefinitive: 'Mint Definitive Stamps',
      topMarginal: 'Top marginal block of 4',
      bottomMarginal: 'Bottom marginal block of 4',
      fullSheet: 'Full sheet',
      fdcAffixed: 'First Day Covers affixed with stamp and cancelled',
      fdcWithoutPersonality: 'First Day Covers without personality series',
      fdcBlank: 'First Day Covers – blank',
      brochureAffixed: 'Information Brochure – affixed with stamp and cancelled',
      brochureBlank: 'Information Brochure- blank',
      annualStampPack: 'Annual Stamp Pack',
      specialAnnualPersonalities: 'Special Annual Stamp Pack of Personalities Only',
      childrenSpecialAnnual: 'Childrens Special Annual Stamp Pack',
      specialCollectorThematics: 'Special Collectors Stamp Pack(Thematics) for gifts',
      firstDayCoverAnnualThematic: 'First Day Cover Pack (Annual Thematic)',
      postalStationary: 'Postal Stationary (From limited seven bureau only)',
      miniSouvenirSheet: 'Mini sheet/souvenir sheet',
      anyOtherItem: 'Any Other Item'
    };
  
    return (
      <div className="space-y-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Review Your Application</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-3 text-secondary">Type of Customer</h3>
            <p className="capitalize">{customerType}</p>
          </div>
    
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-medium mb-3 text-secondary">Personal Details</h3>
            <ul className="space-y-2">
              <li><span className="font-medium">Name:</span> {personalDetails.applicantName}</li>
              <li><span className="font-medium">Address:</span> {personalDetails.mailingAddress}</li>
              <li><span className="font-medium">Pin Code:</span> {personalDetails.pinCode}</li>
              <li><span className="font-medium">Frequency:</span> {personalDetails.frequency}</li>
              <li><span className="font-medium">Detail Type:</span> {personalDetails.detailType}</li>
            </ul>
          </div>
        </div>
    
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-secondary">Order Details</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2">Item</th>
                  <th className="text-right p-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(orderDetails).map(([key, value]) => {
                  if (value > 0 && key !== 'anyOtherItemName') {
                    return (
                      <tr key={key} className="border-b">
                        <td className="p-2">
                          {key === 'anyOtherItem' 
                            ? (orderDetails.anyOtherItemName || 'Other Item') 
                            : itemNames[key] || key}
                        </td>
                        <td className="text-right p-2">{value}</td>
                      </tr>
                    );
                  }
                  return null;
                })}
              </tbody>
            </table>
          </div>
        </div>
    
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-3 text-secondary">Deposit Amount</h3>
          <div className="flex items-center space-x-4">
            <input
              type="number"
              min="200"
              step="1"
              required
              className="border rounded p-2 w-full max-w-xs"
              placeholder="Enter amount (min ₹200)"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
            />
            <span className="text-sm text-gray-500">Minimum deposit: ₹200</span>
          </div>
        </div>
    
        <div className="flex justify-end">
          <Button 
            onClick={handleCheckout}
            className="bg-secondary text-primary hover:bg-secondary/90"
          >
            Checkout
          </Button>
        </div>
      </div>
    );
  };

  const renderPaymentGateway = () => (
    <div className="space-y-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Payment Gateway</h2>
      <Card className="border-secondary/20 shadow-lg">
        <CardHeader className="bg-secondary/10">
          <CardTitle className="text-secondary">Complete Your Payment</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 bg-secondary/10">
          <Tabs defaultValue="upi" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-secondary/20">
              <TabsTrigger 
                value="upi" 
                className="data-[state=active]:bg-secondary data-[state=active]:text-primary hover:bg-secondary/80 hover:text-primary transition-colors"
              >
                UPI
              </TabsTrigger>
              <TabsTrigger 
                value="card" 
                className="data-[state=active]:bg-secondary data-[state=active]:text-primary hover:bg-secondary/80 hover:text-primary transition-colors"
              >
                Card
              </TabsTrigger>
              <TabsTrigger 
                value="netbanking" 
                className="data-[state=active]:bg-secondary data-[state=active]:text-primary hover:bg-secondary/80 hover:text-primary transition-colors"
              >
                Net Banking
              </TabsTrigger>
            </TabsList>
            <TabsContent value="upi" className="mt-4">
              <div className="space-y-4">
                <Label htmlFor="upi-id">UPI ID</Label>
                <Input 
                  id="upi-id" 
                  placeholder="Enter your UPI ID" 
                  className="border-secondary/20 focus:border-secondary focus:ring-secondary"
                />
              </div>
            </TabsContent>
            <TabsContent value="card" className="mt-4">
              <div className="space-y-4">
                <Label htmlFor="card-number">Card Number</Label>
                <Input 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456" 
                  className="border-secondary/20 focus:border-secondary focus:ring-secondary"
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      className="border-secondary/20 focus:border-secondary focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      className="border-secondary/20 focus:border-secondary focus:ring-secondary"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="netbanking" className="mt-4">
              <div className="space-y-4">
                <Label>Select Your Bank</Label>
                <select className="w-full p-2 border rounded border-secondary/20 focus:border-secondary focus:ring-secondary">
                  <option>Select a bank</option>
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  {/* Add more banks as needed */}
                </select>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-secondary/10 ">
          <div className="text-lg font-semibold text-secondary">
            Total Amount: ₹{depositAmount}
          </div>
          <Button className="bg-secondary text-primary hover:bg-secondary/90 transition-colors">
            Pay Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );

  const renderOrderDetails = () => {
    const pack1Items = [
      { id: 'mintCommemorative', label: 'Mint Commemorative Stamps' },
      { id: 'mintCommemorative2', label: 'Mint Commemorative Stamps without personalities series' },
      { id: 'mintDefinitive', label: 'Mint Definitive Stamps' },
      { id: 'topMarginal', label: 'Top marginal block of 4' },
      { id: 'bottomMarginal', label: 'Bottom marginal block of 4' },
      { id: 'fullSheet', label: 'Full sheet' }
    ];

    const firstDayCoverItems = [
      { id: 'fdcAffixed', label: 'First Day Covers affixed with stamp and cancelled' },
      { id: 'fdcWithoutPersonality', label: 'First Day Covers without personality series' },
      { id: 'fdcBlank', label: 'First Day Covers – blank' }
    ];

    const informationBrochureItems = [
      { id: 'brochureAffixed', label: 'Information Brochure – affixed with stamp and cancelled' },
      { id: 'brochureBlank', label: 'Information Brochure- blank' }
    ];

    const stampPackItems = [
      { id: 'annualStampPack', label: "Annual Stamp Pack" },
      { id: 'specialAnnualPersonalities', label: "Special Annual Stamp Pack of Personalities Only" },
      { id: 'childrenSpecialAnnual', label: "Children's Special Annual Stamp Pack" },
      { id: 'specialCollectorThematics', label: "Special Collector's Stamp Pack(Thematics) for gifts" },
      { id: 'firstDayCoverAnnualThematic', label: "First Day Cover Pack (Annual Thematic)" }
    ];

    const postalStationaryItems = [
      { id: 'postalStationary', label: "Postal Stationary (From limited seven bureau only)- Delhi, Calcutta, Mumbai, Chennai, Bangalore, Hyderabad, Ahmedabad" }
    ];

    const miniSouvenirSheetItems = [
      { id: 'miniSouvenirSheet', label: "Mini sheet/souvenir sheet" }
    ];

    const itemNames = {
      mintCommemorative: 'Mint Commemorative Stamps',
      mintCommemorative2: 'Mint Commemorative Stamps without personalities series',
      mintDefinitive: 'Mint Definitive Stamps',
      topMarginal: 'Top marginal block of 4',
      bottomMarginal: 'Bottom marginal block of 4',
      fullSheet: 'Full sheet',
      fdcAffixed: 'First Day Covers affixed with stamp and cancelled',
      fdcWithoutPersonality: 'First Day Covers without personality series',
      fdcBlank: 'First Day Covers – blank',
      brochureAffixed: 'Information Brochure – affixed with stamp and cancelled',
      brochureBlank: 'Information Brochure- blank',
      annualStampPack: 'Annual Stamp Pack',
      specialAnnualPersonalities: 'Special Annual Stamp Pack of Personalities Only',
      childrenSpecialAnnual: 'Childrens Special Annual Stamp Pack',
      specialCollectorThematics: 'Special Collectors Stamp Pack(Thematics) for gifts',
      firstDayCoverAnnualThematic: 'First Day Cover Pack (Annual Thematic)',
      postalStationary: 'Postal Stationary (From limited seven bureau only)',
      miniSouvenirSheet: 'Mini sheet/souvenir sheet',
      anyOtherItem: 'Any Other Item'
    };
    const renderOrderSummary = () => {
      const orderedItems = Object.entries(orderDetails).filter(([key, value]) => 
        value > 0 && key !== 'anyOtherItemName'
      );

      if (orderedItems.length === 0) {
        return null;
      }

      return (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <ul className="space-y-2">
            {orderedItems.map(([key, value]) => (
              <li key={key} className="flex justify-between items-start">
                <span className="text-sm flex-grow mr-4">
                  {key === 'anyOtherItem' 
                    ? (orderDetails.anyOtherItemName || 'Other Item') 
                    : itemNames[key] || key}
                </span>
                <span className="font-medium">{value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-2 border-t border-gray-300 flex justify-between font-semibold">
            <span>Total Items:</span>
            <span>{orderedItems.reduce((sum, [_, value]) => sum + value, 0)}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-6 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <select 
            className="border rounded p-2 bg-white"
            value={selectedPack}
            onChange={handlePackChange}
          >
            <option>Pack 1</option>
            <option>First Day Cover</option>
            <option>Information Brochure</option>
            <option>Stamp Pack</option>
            <option>Postal Stationary</option>
            <option>Mini/Souvenir Sheet</option>
            <option>Any Other Item</option>
          </select>
        </div>
        {selectedPack === 'Pack 1' ? (
          <div className="space-y-4">
            {pack1Items.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'First Day Cover' ? (
          <div className="space-y-4">
            {firstDayCoverItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'Information Brochure' ? (
          <div className="space-y-4">
            {informationBrochureItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'Stamp Pack' ? (
          <div className="space-y-4">
            {stampPackItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'Postal Stationary' ? (
          <div className="space-y-4">
            {postalStationaryItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'Mini/Souvenir Sheet' ? (
          <div className="space-y-4">
            {miniSouvenirSheetItems.map((item, index) => (
              <div key={item.id} className="flex justify-between items-center">
                <span className="text-sm font-medium">{index + 1}. {item.label}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOrderChange(item.id, -1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{orderDetails[item.id]}</span>
                  <button
                    onClick={() => handleOrderChange(item.id, 1)}
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : selectedPack === 'Any Other Item' ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Any Other Item:</label>
              <input
                type="text"
                value={orderDetails.anyOtherItemName}
                onChange={(e) => handleInputChange('anyOtherItemName', e.target.value)}
                className="border rounded p-2 flex-grow"
                placeholder="Enter item name"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOrderChange('anyOtherItem', -1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center">{orderDetails.anyOtherItem}</span>
                <button
                  onClick={() => handleOrderChange('anyOtherItem', 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Placeholder for other packs */}
            <p>Details for {selectedPack} will be displayed here.</p>
          </div>
        )}
        
        {renderOrderSummary()}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
          <Image
            src={pda}
            alt="Stamp image"
            layout="fill"
            objectFit="cover"
            className="w-full"
          />
        </div> */}
        <div className="p-6 sm:p-8 lg:p-12">
          <h1 className={`text-6xl font-bold text-center mb-4 ${elsieSwashCaps.className}`}>Philately Deposit Account</h1>
          
          <p className="text-sm text-gray-600 mb-8 text-center">
            Fill this easy Form to activate your philately deposit account and receive your favorite material regularly
          </p>
          
          <div className="relative mb-12">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm ${
                    index <= currentStep ? 'bg-secondary text-primary' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-2 hidden sm:block">{step}</span>
                </div>
              ))}
            </div>
            <div className="absolute top-4 sm:top-5 left-0 right-0 h-0.5 bg-gray-300" />
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 sm:p-8 mb-8">
            {currentStep === 0 && renderTypeOfCustomers()}
            {currentStep === 1 && renderPersonalDetails()}
            {currentStep === 2 && renderOrderDetails()}
            {currentStep === 3 && renderReview()}
            {currentStep === 4 && renderPaymentGateway()}
            {/* Add other step renderings here */}
          </div>
          
          <div className="flex justify-between items-center">
            {currentStep > 0 ? (
              <button 
                className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm sm:text-base"
                onClick={prevStep}
              >
                Previous
              </button>
            ) : <div></div>}
            <button className="px-4 py-2 sm:px-6 sm:py-3 bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-sm sm:text-base">
              Save
            </button>
            <button 
              className="px-4 py-2 sm:px-6 sm:py-3 bg-secondary text-primary rounded hover:bg-secondary/90 transition-colors text-sm sm:text-base"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-primary text-secondary">
          <DialogHeader>
            <DialogTitle>Invalid Deposit Amount</DialogTitle>
            <DialogDescription>
              Please enter a value above 200 rupees to proceed with the checkout.
            </DialogDescription>
          </DialogHeader>
          <Button onClick={() => setIsModalOpen(false)} className="mt-4 hover:bg-secondary hover:text-primary">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}