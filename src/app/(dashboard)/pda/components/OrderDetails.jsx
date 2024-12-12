"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export function OrderDetails({ details, onChange, onAddItem, depositAmount, onDepositChange, onValidityChange }) {
  const router = useRouter();
  const productType = details.productType;
  const [addedItems, setAddedItems] = React.useState(() => {
    // Initialize from localStorage if available
    const savedItems = localStorage.getItem('pdaOrderItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    // Load deposit amount from localStorage on mount
    const savedDepositAmount = localStorage.getItem('pdaDepositAmount');
    if (savedDepositAmount && !depositAmount) {
      onDepositChange(JSON.parse(savedDepositAmount));
    }
  }, []);

  useEffect(() => {
    // Save deposit amount whenever it changes
    localStorage.setItem('pdaDepositAmount', JSON.stringify(depositAmount));
  }, [depositAmount]);

  // Save to localStorage whenever items change
  React.useEffect(() => {
    localStorage.setItem('pdaOrderItems', JSON.stringify(addedItems));
    localStorage.setItem('pdaFormData', JSON.stringify({
      ...details,
      addedItems,
      depositAmount
    }));
  }, [addedItems, details, depositAmount]);

  React.useEffect(() => {
    const hasMinimumDeposit = depositAmount >= 200;
    const hasItems = addedItems.length > 0;
    const isValid = hasMinimumDeposit && hasItems;
    
    onValidityChange(isValid);
  }, [addedItems, depositAmount, onValidityChange]);

  const validateForm = () => {
    return addedItems.length > 0 && depositAmount >= 200;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...details,
      [name]: value
    });
  };

  const handleQuantityChange = (itemName, value) => {
    if (value === '') {
      onChange({
        productType,
        [itemName]: ''
      });
      return;
    }
    
    const numericValue = Math.max(0, parseInt(value) || 0);
    
    // Only update the specific item's quantity
    onChange({
        ...details,  // Keep existing details
        productType,
        [itemName]: numericValue  // Update only this specific item
    });
  };

  const handleAddItem = (itemName, itemLabel) => {
    const quantity = details[itemName] || 0;
    if (quantity > 0) {
      const newItem = {
        type: productType,
        name: itemLabel,
        quantity: parseInt(quantity),
        id: `${productType}-${itemName}-${Date.now()}`,
        code: itemName,
      };
      
      const existingItemIndex = addedItems.findIndex(
        item => item.code === itemName && item.type === productType
      );
      
      let updatedItems;
      if (existingItemIndex !== -1) {
        updatedItems = [...addedItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: parseInt(quantity)
        };
      } else {
        updatedItems = [...addedItems, newItem];
      }
      
      setAddedItems(updatedItems);
      
      // Only pass the necessary updates
      onChange({
        productType,
        addedItems: updatedItems,
        [itemName]: 0  // Reset only this item's quantity input
      });
      
      onAddItem(newItem);
      onValidityChange(true);

      toast.success(
        <div className="flex flex-col">
          <span className="font-medium">
            {existingItemIndex !== -1 ? 'Item Updated' : 'Item Added'}
          </span>
          <span className="text-sm">{itemLabel}: {quantity} units</span>
        </div>,
        { duration: 3000 }
      );
    }
  };

  const handleOtherItemAdd = () => {
    if (!details.otherItemName?.trim()) {
      toast.error('Please enter an item name', {
        icon: '⚠️',
        duration: 3000
      });
      return;
    }
    
    handleAddItem('otherItemQuantity', details.otherItemName.trim());
  };

  const handleRemoveItem = (itemId, itemName) => {
    const updatedItems = addedItems.filter(i => i.id !== itemId);
    
    setAddedItems(updatedItems);
    
    onChange({
      ...details,
      addedItems: updatedItems
    });
    
    onValidityChange(updatedItems.length > 0);
    
    toast.success(`Removed: ${itemName}`);
  };

  const getItemLabel = (itemName, productType) => {
    switch (productType) {
      case 'postalStationary':
        return 'Postal Stationary (From limited seven bureau only)- Delhi, Calcutta, Mumbai, Chennai, Bangalore, Hyderabad, Ahmedabad';
      case 'firstDayCovers':
        return 'First Day Covers affixed with stamp and cancelled';
      // Add other cases as needed
      default:
        return itemName;
    }
  };

  const renderQuantityInput = (item) => {
    return (
      <div className="flex items-center space-x-3">
        <input
          type="number"
          min="0"
          // Use the specific item's quantity or default to 0
          value={details[item.name] || 0}
          onChange={(e) => handleQuantityChange(item.name, e.target.value)}
          className="w-24 p-2.5 border rounded-lg text-center"
        />
        <button
          onClick={() => handleAddItem(item.name, item.label)}
          className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Add</span>
        </button>
      </div>
    );
  };

  const pack1Items = [
    { id: 1, name: "mintCommemorative", label: "Mint Commemorative Stamps" },
    { id: 2, name: "mintCommWithoutPersonalities", label: "Mint Commemorative Stamps without personalities series" },
    { id: 3, name: "mintDefinitive", label: "Mint Definitive Stamps" },
    { id: 4, name: "topMarginal", label: "Top marginal block of 4" },
    { id: 5, name: "bottomMarginal", label: "Bottom marginal block of 4" },
    { id: 6, name: "fullSheet", label: "Full sheet" }
  ];

  const firstDayCoverItems = [
    { id: 1, name: "fdcWithStamp", label: "First Day Covers affixed with stamp and cancelled" },
    { id: 2, name: "fdcWithoutPersonality", label: "First Day Covers without personality series" },
    { id: 3, name: "fdcBlank", label: "First Day Covers – blank" }
  ];

  const infoBrochureItems = [
    { id: 1, name: "brochureWithStamp", label: "Information Brochure – affixed with stamp and cancelled" },
    { id: 2, name: "brochureBlank", label: "Information Brochure- blank" }
  ];

  const stampPackItems = [
    { id: 1, name: "annualStampPack", label: "Annual Stamp Pack" },
    { id: 2, name: "specialAnnualPack", label: "Special Annual Stamp Pack of Personalities Only" },
    { id: 3, name: "childrensPack", label: "Children's Special Annual Stamp Pack" },
    { id: 4, name: "specialCollectorPack", label: "Special Collector's Stamp Pack(Thematics) for gifts" },
    { id: 5, name: "fdcAnnualPack", label: "First Day Cover Pack (Annual Thematic)" }
  ];

  const postalStationaryItems = [
    { 
      id: 1, 
      name: "postalStationaryItem", 
      label: "Postal Stationary (From limited seven bureau only)- Delhi, Calcutta, Mumbai, Chennai, Bangalore, Hyderabad, Ahmedabad" 
    }
  ];

  const miniSouvenirItems = [
    { 
      id: 1, 
      name: "miniSheet", 
      label: "Mini sheet/souvenir sheet" 
    }
  ];

  const SectionHeader = ({ title, description }) => (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      )}
    </div>
  );

  const renderOrderSummary = () => {
    if (!addedItems.length) {
      return (
        <div className="text-center py-4 text-gray-500">
          No items added yet
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {addedItems.map((item, index) => (
          <div key={item.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">Type: {item.type}</p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Qty: {item.quantity}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id, item.name)}
                className="text-red-500 hover:text-red-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderValidationMessage = () => {
    const messages = [];

    if (!productType) {
      messages.push("Please select a product type");
    }
    if (addedItems.length === 0) {
      messages.push("At least one item must be added to continue");
    }
    if (!depositAmount || depositAmount < 200) {
      messages.push("Minimum deposit of ₹200 is required to continue");
    }

    if (messages.length === 0) return null;

    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
        {messages.map((message, index) => (
          <p key={index} className="text-red-600 text-sm flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {message}
          </p>
        ))}
      </div>
    );
  };

  const handleDepositChange = (value) => {
    const amount = parseInt(value) || 0;
    localStorage.setItem('pdaDepositAmount', JSON.stringify(amount));
    onDepositChange(amount);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Order Details</h2>
      
      <div className="space-y-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <SectionHeader 
            title="Select Product Type" 
            description="Choose the type of product you'd like to order"
          />
          <select
            name="productType"
            value={productType}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          >
            <option value="">Select Product Type</option>
            <option value="pack1">Pack 1</option>
            <option value="firstDayCover">First Day Cover</option>
            <option value="infoBrochure">Information Brochure</option>
            <option value="stampPack">Stamp Pack</option>
            <option value="postalStationary">Postal Stationary</option>
            <option value="miniSouvenirSheet">Mini/Souvenir Sheet</option>
            <option value="otherItem">Any Other Item</option>
          </select>
        </div>

        {productType && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <SectionHeader 
              title={productType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              description="Select quantities for the items you want to order"
            />
            {productType === 'pack1' && (
              <div className="space-y-4">
                {pack1Items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'firstDayCover' && (
              <div className="space-y-4">
                {firstDayCoverItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'infoBrochure' && (
              <div className="space-y-4">
                {infoBrochureItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'stampPack' && (
              <div className="space-y-4">
                {stampPackItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'postalStationary' && (
              <div className="space-y-4">
                {postalStationaryItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'miniSouvenirSheet' && (
              <div className="space-y-4">
                {miniSouvenirItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">
                      {item.id}. {item.label}
                    </span>
                    {renderQuantityInput(item)}
                  </div>
                ))}
              </div>
            )}

            {productType === 'otherItem' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Any Other Item:</label>
                  <input
                    type="text"
                    name="otherItemName"
                    value={details.otherItemName || ''}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg"
                    placeholder="Enter item name"
                  />
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                  <span className="text-sm">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      value={details.otherItemQuantity || 0}
                      onChange={(e) => handleQuantityChange('otherItemQuantity', e.target.value)}
                      className="w-24 p-2.5 border rounded-lg text-center"
                    />
                    <button
                      onClick={handleOtherItemAdd}
                      className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <SectionHeader 
            title="Deposit Amount" 
            description="Minimum deposit of ₹200 is required to proceed"
          />
          <div className="relative">
            <div className="flex items-center">
              <span className="absolute left-3 text-gray-500">₹</span>
              <input
                type="number"
                required
                value={depositAmount}
                onChange={(e) => handleDepositChange(e.target.value)}
                className={`w-full p-3 pl-8 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  (!depositAmount || depositAmount < 200) ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter deposit amount (minimum ₹200)"
                min="200"
              />
            </div>
            {(!depositAmount || depositAmount < 200) && (
              <div className="mt-2 flex items-center text-red-500 text-sm">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Minimum deposit amount of ₹200 is required
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <SectionHeader 
            title="Order Summary" 
            description="Review your selected items"
          />
          {renderOrderSummary()}
          {addedItems.length === 0 && (
            <div className="mt-2 flex items-center text-red-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              At least one item must be added to continue
            </div>
          )}
        </div>
      </div>

      {renderValidationMessage()}

      <Toaster 
        position="top-right"
        toastOptions={{
          className: '',
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
          },
        }}
      />
    </div>
  );
}