import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

// Define API URL mapping based on the type
const apiUrls = {
  name: "http://localhost:3000/api/users?type=name",
  customers: "http://localhost:3000/api/users?type=customers",
  contactperson: "http://localhost:3000/api/users?type=contactperson",
};

const SapDropDown = ({ label, secondaryColor, type, ...props }) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const apiUrl = apiUrls[type]; // Dynamically select API URL based on the type
      if (!apiUrl) {
        console.error(`Invalid type: ${type}`);
        return;
      }
      
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    if (type) {
      fetchOptions();
    }
  }, [type]); // Fetch when the type changes

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    padding: "4px",
   backgroundImage: `linear-gradient(to bottom, white 5%,  gray 300%)`,  
    borderRadius: "6px",
    border: "2px solid #ccc",
  };

  const labelStyle = {
    flex: 1,
    fontWeight: "bold",
    fontSize: "12px",
  };

  const textFieldStyle = {
    flex: 2,
    fontSize: "12px",
    borderRadius: "4px",
    backgroundColor: "white",
    padding: 0,
  };

  const inputPropsStyle = {
    fontSize: "12px",
    padding: 0,
  };

  const inputStyle = {
    padding: "2px 4px",
    fontSize: "12px",
    height: "28px",
  };

  return (
    <div style={containerStyle}>
      <label style={labelStyle}>{label}</label>

      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.label || option} // Handle options that may not have a label field
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              style: inputStyle,
            }}
            inputProps={{
              ...params.inputProps,
              style: inputPropsStyle,
            }}
            style={textFieldStyle}
          />
        )}
        style={{ flex: 2 }}
        {...props} // Pass remaining props to Autocomplete
      />
    </div>
  );
};

export default SapDropDown;
