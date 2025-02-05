import React from 'react';

const CxRemarks = ({ label, secondaryColor, width = '100%' }) => {
  return (
    <div className="mt-2" style={{ width: width }}>
      {/* Remarks */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px',
          backgroundImage: `linear-gradient(to bottom, white 10%,  gray 300%)`,  
            borderRadius: '6px',
          border: '2px solid #ccc',
        }}
      >
        <label style={{ flex: 1, fontWeight: 'bold', fontSize: '12px' }}>
          {label}
        </label>
        <textarea
          placeholder={`Enter ${label}`}
          rows="3"
          style={{
            flex: 2,
            padding: '2px',
            fontSize: '12px',
            borderRadius: '4px',
            border: '2px solid #ccc',
            width: '100%', // Ensure it fills its container
          }}
        />
      </div>
    </div>
  );
};

export default CxRemarks;
