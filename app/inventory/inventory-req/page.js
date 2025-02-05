"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import {
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import SapDateField from "@/app/components/fields/date/sapDateField";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxContents from "@/app/components/tables/CxContents";
import CxAttachment from "@/app/components/tables/CxAttachment";

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

function Page() {
  const [formData, setFormData] = useState({
    businessPartner: "",
    name: "",
    contactPerson: "",
    shipTo: "",
    no: "",
    status: "",
    postingDate: "",
    dueDate: "",
    documentDate: "",
    fromWarehouse: "",
    toWarehouse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        itemNo: rows.length + 1,
        description: "",
        fromWarehouse: "",
        toWarehouse: "",
        quantity: "",
        uomCode: "",
        uomName: "",
        moisture: "",
        rejection: "",
        grade: "",
        value: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  {
  }

  const [rowsA, setRowsA] = useState([
    {
      itemNo: 1,
      targetpath: "",
      filename: "",
      attacheddate: "",
      freetext: "",
      copytotargetdocument: "",
    },
  ]);

  const handleInputChangeA = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsA];
    updatedRows[index][name] = value;
    setRowsA(updatedRows);
  };

  const handleAddRowA = () => {
    setRowsA([
      ...rowsA,
      {
        itemNo: rowsA.length + 1,
        targetpath: "",
        filename: "",
        attacheddate: "",
        freetext: "",
        copytotargetdocument: "",
      },
    ]);
  };

  const handleDeleteRowA = (index) => {
    const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
    setRowsA(updatedRows);
  };
  {
    /* Attachment Section Ends here */
  }

  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCopyFromDropdown, setShowCopyFromDropdown] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Add and Close");
  const [copyFromOption, setCopyFromOption] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (label) => {
    setButtonLabel(label); // Update the button label to the selected value
    setShowDropdown(false); // Hide the dropdown after selection
  };

  const toggleCopyFromDropdown = () => {
    setShowCopyFromDropdown(!showCopyFromDropdown);
  };

  const handleCopyFromOptionSelect = (option) => {
    setCopyFromOption(option);
    setShowCopyFromDropdown(false);
  };

  const fieldConfigs = [
    { name: "itemNo", label: "Item no." },
    { name: "description", label: "Description" },
    { name: "fromWarehouse", label: "From Warehouse" },
    { name: "toWarehouse", label: "To Warehouse" },
    { name: "quanity", label: "Quanity" },
    { name: "uomCode", label: "UOM Code" },
  ];

  const fieldConfigsA = [
    { name: "targetPath", label: "Browse" },
    { name: "fileName", label: "File Name" },
    { name: "attachmentDate", label: "Attachment Date" },
  ];

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <div className={`${font.className}`}>
          {/* Title Section */}
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              height: "100%",
            }}
          >
            <p className="text-2xl font-bold text-black mt-3 ml-2">
              Inventory Transfer Request
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            {/* Top Section */}
            <div className="grid grid-cols-2 mt-2 ml-2 mr-2 gap-72">
              {/* Your content for the top section goes here */}

              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapDropDown
                  label="Business Partner:"
                  secondaryColor={secondaryColor}
                  option="Select Partner"
                  option1="Partner 1"
                  option2="Partner 2"
                  option3="Partner 3"
                />
                {/* Name: column */}

                <SapDropDown
                  label="Name:"
                  secondaryColor={secondaryColor}
                  option="Select Name"
                  option1="Name 01"
                  option2="Name 02"
                  option3="Name 03"
                />
                {/* Contact Person: column */}

                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Contact Person:"
                  option="Select Contact Person"
                  option1="Person 1"
                  option2="Person 2"
                  option3="Person 3"
                />

                {/* Ship To: column */}
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Ship To:"
                  option="Select Location"
                  option1="Location 01"
                  option2="Location 02"
                  option3="Location 03"
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                  }}
                >
                  {/* Additional text field below without label */}
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      height: "80px",
                      padding: "5px",
                      marginTop: "4px",
                      fontSize: "12px",
                      border: "2px solid #ccc",
                      borderRadius: "4px",
                    }}
                    placeholder="Enter additional info"
                  />

                  {/* Price List: column */}
                  <SapDropDown
                    secondaryColor={secondaryColor}
                    label="Price List:"
                    option="Last Price List"
                    option1="Price 1"
                    option2="Price 2"
                    option3="Price 3"
                  />
                </div>
              </div>

              {/* Right column */}

              <div className="space-y-2" style={{ width: "450px" }}>
                {/* Number Dropdown */}
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Number:"
                  option="Select Number"
                  option1="No 01"
                  option2="No 02"
                  option3="No 03"
                />

                {/* Status Dropdown */}
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Status:"
                  option="Select Status"
                  option1="Open"
                  option2="Pending"
                  option3="Closed"
                />

                {/* Posting Date */}
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Posting Date"
                />

                {/* Due Date */}
                <SapDateField
                  label="Due Date"
                  secondaryColor={secondaryColor}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                  }}
                >
                  {/* Document Date */}
                  <SapDateField
                    secondaryColor={secondaryColor}
                    label="Document Date"
                  />

                  {/* From Warehouse Dropdown */}
                  <SapDropDown
                    secondaryColor={secondaryColor}
                    label="From Warehouse:"
                    option="Select Warehouse"
                    option1="Warehouse 01"
                    option2="Warehouse 02"
                    option3="Warehouse 03"
                  />
                </div>

                {/* To Warehouse Dropdown */}
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="To Warehouse:"
                  option="Select Warehouse"
                  option1="Warehouse 01"
                  option2="Warehouse 02"
                  option3="Warehouse 03"
                />
              </div>
            </div>
          </Paper>

          <div className="mt-2 mb-0"></div>

          {/* bottom Tab section */}

          <Paper
            elevation={3}
            style={{
              backgroundColor: secondaryColor,
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
              height: "100%",
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                ".MuiTab-root": {
                  padding: "2px 1px",
                },
                ".MuiTabs-flexContainer": {
                  justifyContent: "left",
                },
              }}
            >
              <Tab
                label="Contents"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Attachments"
                sx={{ fontWeight: "bold", fontSize: "12px" , marginLeft:"5px"}}
              />
            </Tabs>

            {/* Tab Panels */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap",width:"1217px" }}>
              <TabPanel value={tabValue} index={0}>
                <CxContents
                  tabValue={tabValue}
                  rows={rows}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  handleAddRow={handleAddRow}
                  fieldConfigs={fieldConfigs}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <CxAttachment
                  tabValue={tabValue}
                  rowsA={rowsA}
                  primaryColor={primaryColor}
                  handleInputChangeA={handleInputChangeA}
                  handleDeleteRowA={handleDeleteRowA}
                  handleAddRowA={handleAddRowA}
                  fieldConfigsA={fieldConfigsA}
                />
              </TabPanel>
            </div>
          </Paper>
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              padding: "20px",
              width: "100%",
              height: "100%",
              marginTop: "4px",
            }}
          >
            {/* Main content container with two columns */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px",
              }}
            >
              {/* Left column */}
              <div style={{ width: "30%" }}>
                <div className="space-y-2" style={{ width: "100%" }}>
                  <SapDropDown
                    secondaryColor={secondaryColor}
                    label="Sales Employee:"
                    option="Sales Employee"
                    option1="Employee 01"
                    option2="Employee 02"
                    option3="Employee 03"
                  />

                  <SapTextField
                    label="Journal Remarks:"
                    secondaryColor={secondaryColor}
                  />
                </div>
              </div>

              {/* Right column */}
              <div style={{ width: "38%" }}>
                <div className="space-y-2">
                  <SapTextField
                    label="Pick and Pack Remarks:"
                    secondaryColor={secondaryColor}
                  />
                  
                 { /*
                  <SapTextField
                    label="Remarks:"
                    secondaryColor={secondaryColor}
                  />
                  */}
                  {/* Remarks */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "4px",
                      background:`${secondaryColor}`,
                      borderRadius: "6px",
                      border: "2px solid #ccc",
                    }}
                  >
                    <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                      Remarks:
                    </label>
                    <textarea
                      placeholder="Enter Remarks"
                      rows="3"
                      style={{
                        flex: 2,
                        padding: "2px",
                        fontSize: "12px",
                        borderRadius: "4px",
                        border: "2px solid #ccc",
                      }}
                    />
                  </div>

                  {/* Buttons Section */}
                  <div style={{ display: "flex", marginTop: "20px" }}>
                    {/* Copy From and Copy To Buttons in one line */}
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                <CustomButton 
                  isDropdown={true} 
                  option1="Add and View" 
                  option2="Add and Close" 
                  onOptionSelect={(option) => console.log(option)} 
                  primaryEnabled={true} 
                  padding="6px 12px" 
                  fontsize="12px" 
                />
                  <CustomButton title="Cancel" primaryEnabled={false} classes={`bg-slate-500 hover:bg-slate-600 rounded`} padding="6px 12px" fontsize="12px"/>
                </div>

                <div  
                  style={{
                    display: "flex",
                    gap: "8px",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                  </div>
                  <CustomButton primaryEnabled={true} title="Copy To" padding=" 8px" fontsize="12px"/>
                </div>
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
