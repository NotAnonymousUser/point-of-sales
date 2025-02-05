import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import { useColor } from "@/app/context/ColorContext";

const CxRadio = ({
  fieldLabel = "", // Optional field label, default is empty
  name = "radioGroup", // Name attribute for the radio buttons
  options = [], // List of options for the radio buttons
}) => {
  const { secondaryColor } = useColor();
  
  // State to track the selected radio option
  const [selectedOption, setSelectedOption] = useState("");

  // UseEffect to load the selected option from localStorage on component mount
  useEffect(() => {
    const savedOption = localStorage.getItem(name);
    if (savedOption) {
      setSelectedOption(savedOption);
    }
  }, [name]);

  // Function to handle radio change
  const handleRadioChange = (value, link) => {
    setSelectedOption(value);
    localStorage.setItem(name, value); // Save the selected option to localStorage
    if (link) {
      window.location.href = link; // Navigate using window.location.href
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        backgroundImage: `linear-gradient(to bottom, white 10%,  gray 300%)`,  
        borderRadius: "6px",
        border: "2px solid #ccc",
      }}
    >
      {/* Conditionally render the field label if provided */}
      {fieldLabel && (
        <label
          style={{
            flex: 1,
            fontWeight: "bold",
            fontSize: "12px",
            background: secondaryColor,
          }}
        >
          {fieldLabel}
        </label>
      )}
      <div
        style={{
          flex: 2,
          display: "flex",
          gap: "10px",
          fontSize: "12px",
        }}
      >
        {/* Render dynamic radio buttons with Links */}
        {options.map((option, index) => (
          <React.Fragment key={index}>
            <input
              type="radio"
              id={option.value}
              name={name}
              value={option.value}
              checked={selectedOption === option.value} // Check if this option is selected
              onChange={() => handleRadioChange(option.value, option.link)}
            />
            <label htmlFor={option.value}>
              <Link href={option.link || '#'}>{option.label}</Link>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CxRadio;
