"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import { Paper, Tabs, Tab, Box, Checkbox, FormControlLabel } from "@mui/material"; // Import Checkbox and FormControlLabel
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxStages from "@/app/components/tables/CxStages";
import CxRadio from "@/app/components/tables/CxRadio"; 

// Tab Panel component
function TabPanel(props) {
  const { children, value, index,   ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

function Page() {
  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Dummy data for rows
  const [rows, setRows] = useState([
    {
      itemNo: 1,
      description: "",
      fromWarehouse: "WHS-0001",
      toWarehouse: "WHS-0001",
      quantity: "",
      uomCode: "",
      uomName: "",
      moisture: "0.00",
      rejection: "",
      grade: "",
      value: "",
    },
  ]);
  const [rowsS, setRowsS] = useState([
    {
      itemNo: 1,
      description: "",
      fromWarehouse: "WHS-0001",
      toWarehouse: "WHS-0001",
      quantity: "",
      uomCode: "",
      uomName: "",
      moisture: "0.00",
      rejection: "",
      grade: "",
      value: "",
    },
  ]);

  // Field configurations
  const fieldConfigsStages = [
    { name: "stageName", label: "Stage Name" },
    { name: "stageDescription", label: "Stage Description" },
  ];

  const fieldConfigsOriginators = [
    { name: "departmentA", label: "Users" },
    { name: "department", label: "Department" },
  ];

  // Handle input change for rows
  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };
  const handleInputChangeS = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsS];
    updatedRows[index][name] = value;
    setRowsS(updatedRows);
  };

  // Handle delete row
  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  const handleDeleteRowS = (index) => {
    const updatedRows = rowsS.filter((_, rowIndex) => rowIndex !== index);
    setRowsS(updatedRows);
  };

  // Handle add row
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        itemNo: rows.length + 1,
        description: "",
        fromWarehouse: "",
        toWarehouse: "",
        quantity: "",
      },
    ]);
  };
  const handleAddRowS = () => {
    setRowsS([
      ...rowsS,
      {
        itemNo: rowsS.length + 1,
        description: "",
        fromWarehouse: "",
        toWarehouse: "",
        quantity: "",
      },
    ]);
  };

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <div>
          {/* Title Section */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
            }}
          >
            <p className="text-2xl font-bold text-black mt-3 ml-2">Approval Template</p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              <div className="space-y-2" style={{ width: "480px" }}>
                <SapTextField label="Name:" secondaryColor={secondaryColor} />
                <SapTextField label="Description:" secondaryColor={secondaryColor} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  <input
                    type="checkbox"
                    id="displayInSystemCurrency"
                    name="displayInSystemCurrency"
                    style={{ marginRight: "10px" }}
                  />
                  <label
                    htmlFor="displayInSystemCurrency"
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    Active
                  </label>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                
                  }}
                >
                  <input
                    type="checkbox"
                    id="displayInSystemCurrency"
                    name="displayInSystemCurrency"
                    style={{ marginRight: "10px" }}
                  />
                  <label
                    htmlFor="displayInSystemCurrency"
                    style={{ fontWeight: "bold", fontSize: "12px" }}
                  >
                    Active When Upload Documents Not Generated By Approval Process
                  </label>
                </div>
              </div>
            </div>
          </Paper>

          {/* Tabs Section */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: secondaryColor,
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              width: "100%",
              height: "auto",
              marginTop: "10px",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                ".MuiTab-root": { padding: "2px 1px" },
                ".MuiTabs-flexContainer": { justifyContent: "left" },
              }}
            >
              <Tab label="Originator" sx={{ fontWeight: "bold", fontSize: "12px" }} />
              <Tab label="Document" sx={{ fontWeight: "bold", fontSize: "12px", marginLeft:"10px"}} />
              <Tab label="Stages" sx={{ fontWeight: "bold", fontSize: "12px" }} />
            </Tabs>

            {/* Tab Panels */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap", width: "100%" }}>
              <TabPanel value={tabValue} index={0}>
               {/* Originators Tab Panel */}
                <CxStages
                  tabValue={tabValue}
                  rows={rows}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  handleAddRow={handleAddRow}
                  index={0}
                  fieldConfigs={fieldConfigsOriginators}
                />

              </TabPanel>

              <TabPanel value={tabValue} index={1}> 
               {/* Document Tab Panel */}
               <div>
                  <CxRadio label="Select Document Type" options={["Type A", "Type B", "Type C"]} />
                </div>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                {/* Stages Tab Panel */}
                <CxStages
                  tabValue={tabValue}
                  rows={rowsS}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChangeS}
                  handleDeleteRow={handleDeleteRowS}
                  handleAddRow={handleAddRowS}
                  index={2}
                  fieldConfigs={fieldConfigsStages}
                />
              </TabPanel>
            </div>
          </Paper>

          {/* Bottom Section - Buttons */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              marginTop: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", gap: "8px", marginLeft: "10px" }}>
                <CustomButton title="Add" primaryEnabled={true} padding="6px 12px" fontsize="12px" />
                <CustomButton title="Cancel" primaryEnabled={false} classes={`bg-slate-500 hover:bg-slate-600 rounded`} padding="6px 12px" fontsize="12px" />
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
