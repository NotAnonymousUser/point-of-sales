import React, { useState } from 'react';
import { useColor } from '@/app/context/ColorContext';

const CxRadio = () => {
  const [selectedRadio, setSelectedRadio] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const { secondaryColor } = useColor();

  // Handle radio button changes
  const handleRadioChange = (event) => {
    setSelectedRadio(event.target.value);
    // Reset checked items when changing the main category
    setCheckedItems({});
  };

  // Handle checkbox changes
  const handleCheckboxChange = (event) => {
    setCheckedItems({
      ...checkedItems,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <div className="flex space-x-10 p-6 bg-gray-100">
      {/* Documents Section */}
      <div className="flex flex-col space-y-4 w-1/2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            background: `${secondaryColor}`,
            borderRadius: '6px',
            border: '2px solid #ccc',
          }}
        >
          <input
            type="radio"
            id="documents"
            name="mainRadio"
            value="documents"
            checked={selectedRadio === 'documents'}
            onChange={handleRadioChange}
            style={{ marginRight: '10px' }}
          />
          <label
            htmlFor="documents"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            Documents
          </label>
        </div>

        {/* Sales - A/R */}
        <div>
          <h3 className="font-semibold text-md mb-2">Sales - A/R</h3>
          {['Sales Quotation', 'Sales Order', 'Delivery', 'Returns Request', 'Returns', 'A/R Down Payment', 'A/R Invoice', 'A/R Credit Memo'].map((label, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name={`salesOption${index}`}
                value={label}
                disabled={selectedRadio !== 'documents'}
                onChange={handleCheckboxChange}
              />
              <label>{label}</label>
            </div>
          ))}
        </div>

        {/* Inventory */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            background: `${secondaryColor}`,
            borderRadius: '6px',
            border: '2px solid #ccc',
          }}
        >
          <input
            type="radio"
            id="inventory"
            name="mainRadio"
            value="inventory"
            checked={selectedRadio === 'inventory'}
            onChange={handleRadioChange}
            style={{ marginRight: '10px' }}
          />
          <label
            htmlFor="inventory"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            Inventory
          </label>
        </div>
        <div>
          {['Goods Receipt', 'Goods Issue', 'Inventory Transfer Request', 'Inventory Transfer', 'Inventory Opening Balance'].map((label, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name={`inventoryOption${index}`}
                disabled={selectedRadio !== 'inventory'}
                onChange={handleCheckboxChange}
              />
              <label>{label}</label>
            </div>
          ))}
        </div>

        {/* Blanket Agreement */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            background: `${secondaryColor}`,
            borderRadius: '6px',
            border: '2px solid #ccc',
          }}
        >
          <input
            type="radio"
            id="agreement"
            name="mainRadio"
            value="agreement"
            checked={selectedRadio === 'agreement'}
            onChange={handleRadioChange}
            style={{ marginRight: '10px' }}
          />
          <label
            htmlFor="agreement"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            Blanket Agreement
          </label>
        </div>

        <div>
          {['Sales Blanket Agreements', 'Purchase Blanket Agreements'].map((label, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name={`blanketOption${index}`}
                disabled={selectedRadio !== 'agreement'}
                onChange={handleCheckboxChange}
              />
              <label>{label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Purchasing A/P, Payment, and Inventory Counting */}
      <div className="flex flex-col space-y-4 w-1/2 mt-11">
        {/* Purchasing - A/P */}
        <div>
          <h3 className="font-semibold text-md mb-2">Purchasing - A/P</h3>
          {['Purchase Quotation', 'Purchase Order', 'Goods Receipt PO', 'Goods Returns Request', 'Goods Returns', 'A/P Down Payment', 'A/P Invoice', 'A/P Credit Memo'].map((label, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name={`purchaseOption${index}`}
                disabled={selectedRadio !== 'documents'}
                onChange={handleCheckboxChange}
              />
              <label>{label}</label>
            </div>
          ))}
        </div>

        {/* Payment */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            background: `${secondaryColor}`,
            borderRadius: '6px',
            border: '2px solid #ccc',
          }}
        >
          <input
            type="radio"
            id="payment"
            name="mainRadio"
            value="payment"
            checked={selectedRadio === 'payment'}
            onChange={handleRadioChange}
            style={{ marginRight: '10px' }}
          />
          <label
            htmlFor="payment"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            Payment
          </label>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              name="outgoingPayment"
              disabled={selectedRadio !== 'payment'}
              onChange={handleCheckboxChange}
            />
            <label>Outgoing Payment</label>
          </div>
        </div>

        {/* Inventory Counting Transactions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
            background: `${secondaryColor}`,
            borderRadius: '6px',
            border: '2px solid #ccc',
          }}
        >
          <input
            type="radio"
            id="counting"
            name="mainRadio"
            value="counting"
            checked={selectedRadio === 'counting'}
            onChange={handleRadioChange}
            style={{ marginRight: '10px' }}
          />
          <label
            htmlFor="counting"
            style={{ fontWeight: 'bold', fontSize: '14px' }}
          >
            Inventory Counting Transactions
          </label>
        </div>
        <div>
          {['Inventory Counting', 'Inventory Posting'].map((label, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <input
                type="checkbox"
                name={`inventoryCountingOption${index}`}
                disabled={selectedRadio !== 'counting'}
                onChange={handleCheckboxChange}
              />
              <label>{label}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CxRadio;
