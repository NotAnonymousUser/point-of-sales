import React, { useState } from "react";
import { Box, Paper, Checkbox, FormControlLabel, Radio } from "@mui/material";
import CxRemarks from "../fields/CXremarks/CxRemarks";
import { useColor } from "@/app/context/ColorContext";
import SapDropDown from "../fields/dropDown/customDropDown";
import FileUploadButton from "../buttons/fileUploadButton/fileUploadButton";
import SapTextField from "../fields/sapFields/sapTextField";
import SapDateField from "../fields/date/sapDateField";
import Cxtime from "../fields/CXtime/Cxtime";

const LogisticTab = ({ fields }) => {
  const [logisticsData, setLogisticsData] = useState({});
  const handleInputChange = (name, value) => {
    setLogisticsData({
      ...logisticsData,
      [name]: value,
    });
  };

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
        <Box sx={{ flex: 0.6, maxWidth: "425px" }}>
          {fields
            .filter((field) => field.section === "left")
            .map((field, index) => {
              if (field.type === "text") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <CxRemarks
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              if (field.type === "dropdown") {
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <SapDropDown
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                  </Box>
                );
              }
              if (field.type === "date") {
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <SapDateField
                  label={field.label}
                  secondaryColor={secondaryColor}
                  width="100%"
                />
                  </Box>
                );
              }
              if (field.type === "checkbox") {
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={logisticsData[field.name] || false}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.checked)
                          }
                        />
                      }
                      label={field.label}
                    />
                  </Box>
                );
              }
              if (field.type === "textfield") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <SapTextField
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              if (field.type === "ddtt") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0px",
                      }}
                    >
                      <SapDateField
                        label={field.label}
                        secondaryColor={secondaryColor}
                        style={{ width: "342px", padding: "0px 0px 0px 2px" }}
                        labelStyle={{ marginRight: "55px" }} // Custom marginRight
                      />

                      <Cxtime secondaryColor={secondaryColor} />
                    </div>
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              if (field.type === "cbfield") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                     <div className="flex ">
                     <FormControlLabel
                      control={
                        <Checkbox
                          checked={logisticsData[field.name] || false}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.checked)
                          }
                        />
                      }                   
                  />
                  <div className=" " style={{ width: "378px",}}>
                    <SapTextField
                      label={field.label}
                      secondaryColor={secondaryColor}
                    
                    />
                  </div>
                </div>
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              return null;
            })}
        </Box>

        {/* Right Side - Full Width Dropdown and Checkboxes */}
        <Box sx={{ flex: 0.4, marginLeft: "auto", maxWidth: "440px" }}>
          {fields
            .filter((field) => field.section === "right")
            .map((field, index) => {
              if (field.type === "text") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <CxRemarks
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              if (field.type === "textfield") {
                return (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 1,
                    }}
                  >
                    <SapTextField
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                    {field.showUploadButton && <FileUploadButton label="..." />}
                  </Box>
                );
              }
              if (field.type === "dropdown") {
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <SapDropDown
                      label={field.label}
                      secondaryColor={secondaryColor}
                      width="100%"
                    />
                  </Box>
                );
              }
              if (field.type === "checkbox") {
                return (
                  <Box key={index} sx={{ mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={logisticsData[field.name] || false}
                          onChange={(e) =>
                            handleInputChange(field.name, e.target.checked)
                          }
                        />
                      }
                      label={field.label}
                    />
                  </Box>
                );
              }
              return null;
            })}
        </Box>
      </Box>
    </Paper>
  );
};

export default LogisticTab;
