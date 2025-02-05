"use client";

import React, { useState, useCallback } from 'react';
import { useColor } from '@/app/context/ColorContext';
import Layout from '@/app/components/Layout/Layout';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Checkbox, FormControlLabel } from '@mui/material';

const initialRolesData = {
  Inventory: [
    { name: "Inventory Counting", checked: false },
    { name: "Goods Receipt", checked: false },
    { name: "Goods Issue", checked: false },
    { name: "UDO", checked: false },
    { name: "Inventory Transfer Request", checked: false },
    { name: "Inventory Transfer", checked: false },
  ],
  Sales: [
    { name: "Sales Blanket Agreement", checked: false },
    { name: "Sales Quotation", checked: false },
    { name: "Sales Order", checked: false },
    { name: "Delivery", checked: false },
    { name: "Return", checked: false },
    { name: "AR Down Payment Request", checked: false },
    { name: "AR Down Payment Invoice", checked: false },
    { name: "AR Invoice", checked: false },
    { name: "AR Credit Memo", checked: false },
    { name: "Recurring Transactions", checked: false },
  ],
  Procurement: [
    { name: "Purchase Blanket Agreement", checked: false },
    { name: "Purchase Request", checked: false },
    { name: "Purchase Quotation", checked: false },
    { name: "Purchase Order", checked: false },
    { name: "Goods Receipt PO", checked: false },
    { name: "Goods Return", checked: false },
    { name: "AP Down Payment Request", checked: false },
    { name: "AP Invoice", checked: false },
    { name: "Outgoing Payment", checked: false },
    { name: "Landed Costs", checked: false },
  ]
};

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [roles, setRoles] = useState(initialRolesData); // State to hold roles data
  const { secondaryColor, primaryColor } = useColor();

  const handleSearch = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const toggleDropdown = useCallback((section) => {
    setDropdownOpen(prevState => ({ ...prevState, [section]: !prevState[section] }));
  }, []);

  const handleCheckboxChange = useCallback((section, roleName, isChecked) => {
    setRoles(prevRoles => ({
      ...prevRoles,
      [section]: prevRoles[section].map(role =>
        role.name === roleName ? { ...role, checked: isChecked } : role
      ),
    }));
  }, []);

  const handleAuthorizationChange = useCallback((section, roleName, value) => {
    setRoles(prevRoles => ({
      ...prevRoles,
      [section]: prevRoles[section].map(role =>
        role.name === roleName ? { ...role, authorizationLevel: value } : role
      ),
    }));
  }, []);

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-start">
        <div className="w-full h-full p-5 border rounded-lg" style={{ backgroundColor: 'white', borderColor: '#d0d0d0' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-black">Authorization</h2>
          </div>

          <hr className="border-gray-700 w-full mb-4" />

          <div className="w-full flex justify-center mt-8">
            <input
              type="text"
              placeholder="Search Employee List"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{
                maxWidth: '1200px',
                backgroundColor: secondaryColor,
                color: 'black',
              }}
            />
          </div>

          <div className="mt-4" style={{ maxWidth: 'auto', margin: '20px' }}>
            <div className="flex justify-between">
              <h3 className="text-xl font-semibold mb-2">Subject:</h3>
              <h3 className="text-xl font-semibold mb-2">Authorization:</h3>
            </div>

            {Object.keys(roles).map((section) => (
              <div className="mb-4" key={section}>
                <div
                  className="flex items-center cursor-pointer py-2"
                  onClick={() => toggleDropdown(section)}
                >
                  {dropdownOpen[section] ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
                  <span className="font-medium">{section}</span>
                </div>
                {dropdownOpen[section] && (
                  <div className="ml-4">
                    {roles[section].map((role) => (
                      <div
                        key={role.name}
                        className="flex items-center mb-1 justify-between border-b border-gray-300 pb-2"
                      >
                        <div className="flex items-center">
                          <FormControlLabel
                            control={<Checkbox
                              sx={{ "&.Mui-checked": { color: primaryColor } }}
                              checked={role.checked}
                              onChange={(e) => handleCheckboxChange(section, role.name, e.target.checked)}
                            />}
                            label={role.name}
                          />
                        </div>
                        <select
                          value={role.authorizationLevel || "Full Authority"}
                          onChange={(e) => handleAuthorizationChange(section, role.name, e.target.value)}
                          className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
                          style={{
                            backgroundColor: secondaryColor,
                            color: 'black',
                          }}
                        >
                          <option value="Full Authority">Full Authority</option>
                          <option value="Read Only">Read Only</option>
                          <option value="No Authority">No Authority</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Page;
