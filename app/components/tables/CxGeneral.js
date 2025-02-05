import React from "react";
import { Box } from "@mui/material";
import SapDropDown from "../fields/dropDown/customDropDown";
import SapTextField from "../fields/sapFields/sapTextField";
import CxRemarks from "../fields/CXremarks/CxRemarks";
import Radio from "@mui/material/Radio"; // Ensure to import Radio from MUI
import SapDateField from "../fields/date/sapDateField";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const CxGeneral = ({ tabValue, secondaryColor, fields, index }) => {
  // Render dynamic fields
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <SapTextField
            key={field.name}
            secondaryColor={secondaryColor}
            label={field.label}
            width={field.width} // Pass width prop here
          />
        );
      case "date":
        return (
          <SapDateField
            key={field.name}
            secondaryColor={secondaryColor}
            label={field.label}
            width={field.width} // Pass width prop here
          />
        );
      case "dropdown":
        return (
          <SapDropDown
            key={field.name}
            secondaryColor={secondaryColor}
            label={field.label}
          />
        );
      case "remarks":
        return <CxRemarks label={field.label} key={field.name} secondaryColor={secondaryColor} />;
      case "radio":
        return (
          <div key={field.name} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <Radio />
            <SapTextField
              label={field.label}
              secondaryColor={secondaryColor}
              width={field.width} // Apply custom width here
            />
          </div>
        );
      case "heading":
        return (
          <h3 key={field.label} style={{ margin: "16px 0" }}>
            {field.label} {/* Render the heading */}
          </h3>
        );
        case "headingin":
          return (
            <h3
              key={field.label}
              style={{
                margin: "30px 0",
                opacity: 0,            // Makes the element invisible
                pointerEvents: "none", // Disables interaction (click, hover, etc.)
                userSelect: "none",    // Prevents text selection
                height: 0,             // Ensures no space is taken
                overflow: "hidden"     // Hides any overflow
              }}
            >
              {field.label} {/* Render the heading */}
            </h3>
          );        
      default:
        return null;
    }
  };

  // Separate fields into left and right sections
  const leftFields = fields.filter((field) => field.section === "left");
  const rightFields = fields.filter((field) => field.section === "right");

  return (
    <TabPanel
      value={tabValue}
      index={index}
      style={{ padding: "0px", overflowY: "auto" }}
    >
      <div className="table-container" style={{ overflowX: "auto" }}>
        <div className="grid grid-cols-2 mb-2 mt-0 ml-1 mr-1 gap-52">
          {/* Left-aligned fields */}
          <div className="space-y-2 justify-self-start" style={{ width: "450px" }}>
            {leftFields.map((field) => renderField(field))}
          </div>

          {/* Right-aligned fields */}
          <div className="space-y-2 justify-self-start" style={{ width: "468px" }}>
            {rightFields.map((field) => renderField(field))}
          </div>
        </div>

        {/* Remarks field */}
        {fields.some((field) => field.type === "remarks") && (
  <CxRemarks
    label={fields.find((field) => field.type === "remarks").label}
    secondaryColor={secondaryColor}
  />
)}

      </div>
    </TabPanel>
  );
};

export default CxGeneral;
