import React from 'react';

const SapTextField = ({ label, defaultValue, secondaryColor, placeholder, width, value, onChange, }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px",
        backgroundImage: `linear-gradient(to bottom, white 10%,  gray 300%)`,  
        borderRadius: "6px",
        border: "2px solid #ccc",
        width: width, // Apply the width here for the outer div
      }}
    >
      {label && (
        <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
          {label}
        </label>
      )}
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        value={value}
        onChange={(e)=>{
          onChange(e.target.value || "");
        }}
        style={{
          flex: label ? 2 : 1, // Adjust flex based on whether a label is present
          padding: "4px",
          fontSize: "12px",
          borderRadius: "4px",
          border: "2px solid #ccc",
          width: "100%", // Set input width to 100% to fill the container
        }}
      />
    </div>
  );
};

export default SapTextField;
