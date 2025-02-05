import React from 'react';
import { useColor } from '@/app/context/ColorContext';

const FileUploadButton = ({ label = "Upload", onChange }) => {
    const { secondaryColor, primaryColor } = useColor();

    return (
        <div>
            <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={onChange} // Pass the file selection handler
            />
            <label
                htmlFor="file-upload"
                style={{
                    width: "100px",  // Increase the width
                    padding: "8px",  // Increase padding for larger size
                    fontSize: "14px",  // Increase font size for better readability
                    borderRadius: "8px",  // Rounded corners
                    border: "2px solid #ccc",  // Slightly thicker border
                    cursor: "pointer",
                    textAlign: "center",
                    backgroundColor: "#f0f0f0",  // White background
                    boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",  // Slightly larger shadow
                    height: "10px",  // Set a fixed height if necessary
                }}
            >
                {label}
            </label>
        </div>
    );
};

export default FileUploadButton;
