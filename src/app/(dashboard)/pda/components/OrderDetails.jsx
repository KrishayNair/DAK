import React from 'react';
import { useRouter } from 'next/navigation';

export function OrderDetails({ details, onChange, onAddItem, depositAmount, onDepositChange }) {
  const router = useRouter();
  const productType = details.productType;
  const [addedItems, setAddedItems] = React.useState(details.addedItems || []);

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
        ...details,
        [itemName]: value
      });
      return;
    }
    
    const numericValue = Math.max(0, parseInt(value) || 0);
    onChange({
      ...details,
      [itemName]: numericValue
    });
  };

  const handleAddItem = (itemName, itemLabel) => {
    const quantity = details[itemName] || 0;
    if (quantity > 0) {
      const newItem = {
        type: productType,
        name: itemLabel,
        quantity: quantity,
        id: itemName
      };
      
      const existingItemIndex = addedItems.findIndex(item => item.id === itemName);
      
      if (existingItemIndex !== -1) {
        const updatedItems = [...addedItems];
        updatedItems[existingItemIndex] = newItem;
        setAddedItems(updatedItems);
        
        onChange({
          ...details,
          addedItems: updatedItems
        });
      } else {
        const newItems = [...addedItems, newItem];
        setAddedItems(newItems);
        
        onChange({
          ...details,
          addedItems: newItems
        });
      }
      
      onAddItem(newItem);
    }
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = addedItems.filter(i => i.id !== itemId);
    setAddedItems(updatedItems);
    onChange({
      ...details,
      addedItems: updatedItems
    });
  };

  const renderQuantityInput = (item) => (
    <div className="flex items-center space-x-3">
      <input
        type="number"
        min="0"
        value={details[item.name] === '' ? '' : (details[item.name] || 0)}
        onChange={(e) => handleQuantityChange(item.name, e.target.value)}
        onClick={(e) => e.target.select()}
        className="w-24 p-2.5 border rounded-lg text-center cursor-text hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        onBlur={() => {
          if (details[item.name] === '' || isNaN(details[item.name])) {
            handleQuantityChange(item.name, '0');
          }
        }}
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
    if (addedItems.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-500 mt-2">No items added to your order yet</p>
          <p className="text-sm text-gray-400 mt-1">Use the "Add" button to include items in your order</p>
        </div>
      );
    }

    return (
      <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
        {addedItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center p-2 bg-white rounded-md shadow-sm">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">{item.name}</span>
              <span className="text-xs text-gray-500">({item.type})</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Qty: {item.quantity}
              </span>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-600 p-1 rounded-full hover:bg-red-50 transition-colors"
                title="Remove item"
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
                  {renderQuantityInput({
                    name: 'otherItemQuantity',
                    label: details.otherItemName || 'Other Item'
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-gray-50 p-6 rounded-lg">
          <SectionHeader 
            title="Order Summary" 
            description="Review your selected items"
          />
          {renderOrderSummary()}
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <SectionHeader 
            title="Deposit Amount" 
            description="Minimum deposit required: ₹200"
          />
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => onDepositChange(e.target.value)}
            className="w-full p-3 border rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Enter deposit amount"
          />
        </div>
      </div>

      {addedItems.length === 0 && (
        <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-700">
          <p className="font-medium">Required Action</p>
          <p className="text-sm">Please add at least one item to proceed to the next step</p>
        </div>
      )}

      {depositAmount < 200 && (
        <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 text-amber-700">
          <p className="font-medium">Required Action</p>
          <p className="text-sm">Minimum deposit amount of ₹200 is required to proceed</p>
        </div>
      )}
    </div>
  );
}