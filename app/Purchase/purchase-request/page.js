"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import CxRemarks from "@/app/components/fields/CXremarks/CxRemarks";
import CxContents from "@/app/components/tables/CxContents";
import CxAttachment from "@/app/components/tables/CxAttachment";
import {
  Paper,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import SapDateField from "@/app/components/fields/date/sapDateField";
import CustomButton from "@/app/components/buttons/customButton/customButton";

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
      item: "",
      itemDescription: "",
      quantity: "",
      requiredDate: null,  // This will be set using DatePicker
      quotedDate: null,    // This will be set using DatePicker
      g_LAccount: "",
      g_LAccountName: "",
      taxCode: "",
      total: "",
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
        item: "",
        itemDescription: "",
        quantity: 0,
        requiredDate: null,
        quotedDate: null,
        g_LAccount: "",
        g_LAccountName: "",
        taxCode: "",
        total: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

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
    { name: "itemDescription", label: "Item Description" },
    { name: "requiredDate", label: "Required Date" },
    { name: "requiredQty", label: "Required Qty." },
    { name: "UoMCode", label: "UoM Code" },
    { name: "infoPrice", label: "Info Price" },
    { name: "total", label: "Total" },
  ];
  // Attachment
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
            }}
          >
            <p className="text-2xl font-bold text-black mt-3 ml-2">
              Purchase Request
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0px",
                  }}
                >
                  <SapDropDown
                    label="Requester:"
                    secondaryColor={secondaryColor}
                    style={{ width: "200px", padding: "0px 0px 0px 85px" }}
                  />
                  <SapTextField placeholder="Manager"
                  secondaryColor={secondaryColor} />
                </div>
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Requester Name:"
                  option="Select Name"
                  option1="Name 1"
                  option2="Name 2"
                  option3="Name 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Branch:"
                  option1="Branch 1"
                  option2="Branch 2"
                  option3="Branch 3"
                />

                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Department:"
                  option1="Department 1"
                  option2="Department 2"
                  option3="Department 3"
                />

                {/* New checkbox with label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                  }}
                >
                  <input type="checkbox" style={{ marginRight: "8px" }} />
                  <label style={{ fontWeight: "bold", fontSize: "12px" }}>
                    Send E-Mail if PO or GRPO is Added
                  </label>
                </div>

                <SapTextField
                  label="Email Address:"
                  secondaryColor={secondaryColor}
                />
              </div>

              {/* Right column */}

              <div className="space-y-2" style={{ width: "450px" }}>
              <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0px",
                  }}
                >
                  <SapDropDown
                    label="Number:"
                    secondaryColor={secondaryColor}
                    style={{ width: "210px", padding: "0px 0px 0px 98px" }}
                  />
                  <SapTextField 
                  secondaryColor={secondaryColor} />
                </div>
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Status:"
                  option="Select Status"
                  option2="Open"
                  option3="Closed"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Posting Date:"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Valid Until:"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Document Date:"
                />
                <SapDateField 
                  label="Required Date:"
                  secondaryColor={secondaryColor}
                />
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
                      flexGrow: 0, // Prevents the label from expanding
                      marginRight: "8px", // Adds a small space between the label and the box
                      fontWeight: "bold",
                      fontSize: "12px",
                      //   marginLeft:"20px",
                    }}
                  >
                    Referenced Document :
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="file-upload"
                    style={{
                      display: "none",
                    }}
                  />

                  {/* Custom label that triggers file input, styled as a small box */}
                  <label
                    htmlFor="file-upload"
                    style={{
                      width: "40px", // Adjust the width to make the box smaller
                      padding: "2px", // Adjust padding for a smaller box
                      fontSize: "12px",
                      marginLeft: "40px",

                      borderRadius: "4px",
                      border: "2px solid #ccc",
                      cursor: "pointer",
                      textAlign: "center",
                      background: "#f0f0f0", // You can change the background color if needed
                    }}
                  >
                    ...
                  </label>
                </div>
              </div>
            </div>
          </Paper>

          <div className="mt-1 mb-0"></div>

          {/* middle Tab section */}

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
          {/* bottom Tab section */}
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
            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapTextField label="Owner:" secondaryColor={secondaryColor} />
                <CxRemarks label="Remarks" secondaryColor={secondaryColor} />
              </div>

              {/* Right column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapTextField
                  label="Total Before Discount:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField label="Freight:" secondaryColor={secondaryColor} />
                <SapTextField label="Tax:" secondaryColor={secondaryColor} />
                <SapTextField
                  label="Total Payment Due:"
                  secondaryColor={secondaryColor}
                />
              </div>
            </div>

            {/* Buttons Section */}
            <div style={{ marginTop: "20px", marginRight: "20px" }}>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", gap: "8px", marginLeft:  "10px" }}>

                  <CustomButton
                    isDropdown={true}
                    options={["Add and View", "Add and Close"]}
                    onOptionSelect={(option) => console.log(option)}
                    primaryEnabled={true}
                    padding="6px 12px"
                    fontsize="12px"
                  />
                  <CustomButton
                    title="Cancel"
                    primaryEnabled={false}
                    classes={`bg-slate-500 hover:bg-slate-600 rounded`}
                    padding="6px 12px"
                    fontsize="12px"
                  />
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {/* Copy From and Copy To Buttons */}
                  <CustomButton
                    primaryEnabled={true}
                    title="Copy From"
                    padding="8px"
                    fontsize="12px"
                    disabled={true} // Disable this button
                  />
                  <CustomButton
                    primaryEnabled={true}
                    title="Copy To"
                    padding="8px"
                    fontsize="12px"
                    disabled={true} // Disable this button
                  />
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
