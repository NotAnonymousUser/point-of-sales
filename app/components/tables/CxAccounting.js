import React from "react";
import { Box, Paper } from "@mui/material";
import CxRemarks from "../fields/CXremarks/CxRemarks";
import { useColor } from "@/app/context/ColorContext";
import SapDropDown from "../fields/dropDown/customDropDown";
import SapTextField from "../fields/sapFields/sapTextField";
import SapDateField from "../fields/date/sapDateField";

const CxAccounting = ({
  fields = {
    leftFields: [],
    rightFields: [],
    fileUploadLabel: "Referenced Document",
  },
}) => {
  const { secondaryColor } = useColor();

  return (
    <Paper
      elevation={3}
      style={{
        backgroundColor: "white",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        overflowX: "auto",
        overflowY: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px",
          width: "100%",
        }}
      >
        {/* Left Side - Fields */}
        <Box sx={{ flex: 0.6, maxWidth: "425px" }} className="space-y-2">
          {/* Loop through left side fields */}
          {fields.leftFields.map((field, index) => (
            <Box key={index}>
              {field.type === "text" && (
                <SapTextField
                  label={field.label}
                  secondaryColor={secondaryColor}
                  style={field.style}
                />
              )}
              {field.type === "dropdown" && (
                <SapDropDown
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width={field.width || "100%"}
                />
              )}
              {field.type === "remarks" && (
                <CxRemarks
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
              {field.type === "date" && (
                <SapDateField
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
              {field.type === "checkbox" && (
                <div className="flex ">
                  <input type="checkbox" />
                  <div className="w-96 ml-5">
                    <SapTextField
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                  </div>
                </div>
              )}
              {field.type === "tcheckbox" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  <label style={{ fontWeight: "bold", fontSize: "12px" }}>
                    {field.label}
                  </label>
                </div>
              )}
            </Box>
          ))}
        </Box>

        {/* Right Side - Full Width Fields */}
        <Box
          sx={{ flex: 0.4, marginLeft: "auto", maxWidth: "440px" }}
          className="space-y-2"
        >
          {/* Loop through right side fields */}
          {fields.rightFields.map((field, index) => (
            <Box key={index}>
              {field.type === "text" && (
                <SapTextField
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
              {field.type === "dropdown" && (
                <SapDropDown
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
              {field.type === "remarks" && (
                <CxRemarks
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
              {field.type === "date" && (
                <SapDateField
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
              )}
            </Box>
          ))}

          {/* File upload */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              marginTop: "30px",
            }}
          >
            <label
              style={{
                flexGrow: 0,
                marginRight: "8px",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              {fields.fileUploadLabel}
            </label>

            <input type="file" id="file-upload" style={{ display: "none" }} />
            <label
              htmlFor="file-upload"
              style={{
                width: "40px",
                padding: "2px",
                fontSize: "12px",
                marginLeft: "40px",
                borderRadius: "4px",
                border: "2px solid #ccc",
                cursor: "pointer",
                textAlign: "center",
                background: "#f0f0f0",
              }}
            >
              ...
            </label>
          </div>
        </Box>
      </Box>
    </Paper>
  );
};

export default CxAccounting;
