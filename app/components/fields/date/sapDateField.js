import React from 'react';

const SapDateField = ({ label, secondaryColor, style, labelStyle }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px",
        backgroundImage: `linear-gradient(to bottom, white 10%,  gray 300%)`,  
        borderRadius: "6px",
        border: "2px solid #ccc",
        ...style, // Merge the passed style prop with the default styles
      }}
    >
      <label
        style={{
          flex: 1,
          fontWeight: "bold",
          fontSize: "12px",
          
          ...labelStyle, // Allow labelStyle to override or add additional styles if needed
        }}
      >
        {label}
      </label>
      <input
        type="date"
        id="dDate"
        name="dDate"
        style={{
          flex: 2,
          padding: "2px",
          fontSize: "12px",
          borderRadius: "4px",
          border: "2px solid #ccc",
          backgroundColor: "white",
        }}
      />
    </div>
  );
};

export default SapDateField;
