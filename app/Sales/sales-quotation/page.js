"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import SapDateField from "@/app/components/fields/date/sapDateField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxContents from "@/app/components/tables/CxContents";
import LogisticTab from "@/app/components/tables/CxLogistic";
import CxAccounting from "@/app/components/tables/CxAccounting";
import CxAttachment from "@/app/components/tables/CxAttachment";
import CxRemarks from "@/app/components/fields/CXremarks/CxRemarks";

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
  const [rows, setRows] = useState([
    {
      itemNo: 1,
      description: "",
      uomCode: "",
      quantity: "",
      unitPrice: "",
      taxCode: "",
      total: "",
    },
  ]);

  const fieldConfigs = [
    { name: "itemNo", label: "Item No." },
    { name: "itemDescription", label: "Item Description" },
    { name: "quantity", label: "Quantity" },
    { name: "uomCode", label: "UoM Code" },
    { name: "unitPrice", label: "Unit Price" },
    { name: "discount", label: "Discount %" },
    { name: "taxCode", label: "Tax Code" },
    { name: "total", label: "Total" },
    { name: "inStock", label: "In Stock" },
  ];

  const fields = [
    {
      section: "left",
      type: "text",
      label: "Ship To",
      showUploadButton: true,
      name: "shipTo",
    },
    {
      section: "left",
      type: "text",
      label: "Bill To",
      showUploadButton: true,
      name: "billTo",
    },

    {
      section: "left",
      type: "dropdown",
      label: "Shipping Type",
      name: "shippingType",
    },

    {
      section: "right",
      type: "checkbox",
      label: "Procure Non Drop-ship Items",
      name: "procureNonDropshipItems",
    },
    {
      section: "right",
      type: "checkbox",
      label: "Procure Drop-ship Items",
      name: "procureDropshipItems",
    },
    {
      section: "right",
      type: "checkbox",
      label: "Confirmed",
      name: "confirmed",
    },
    {
      type: "textfield",
      label: "BP Channel Name:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "dropdown",
      label: "BP Channel Contact:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
  ];

  const accountingFields = {
    leftFields: [
      { type: "text", label: "Journal Remarks:", style: { width: "100%" } },
      { type: "dropdown", label: "Payment Terms", width: "100%" },
      { type: "dropdown", label: "Payment Method", width: "100%" },
      { type: "dropdown", label: "Central Bank Ind.", width: "100%" },
      { type: "date", label: "Manually Recalculate Due Date:", width: "150px" },
      { type: "text", label: "Month +", style: { width: "200px" } },
      { type: "text", label: "Days", style: { width: "200px" } },
      {
        type: "text",
        label: "Cash Discount Date Offset:",
        style: { width: "100%" },
      },
      { type: "tcheckbox", label: "Use Shipped Goods Amount", width: "150px" },
    ],
    rightFields: [
      {
        type: "text",
        label: "Business Partner Project:",
        style: { width: "100%" },
      },
      {
        type: "remarks",
        label: "Create QR Code From",
        style: { width: "100%" },
      },
      { type: "dropdown", label: "Indicator", width: "100%" },
      { type: "text", label: "Federal Tax ID", style: { width: "100%" } },
      { type: "text", label: "Order Number", style: { width: "100%" } },
    ],
    fileUploadLabel: "Referenced Document:",
  };

  const fieldConfigsA = [
    { name: "targetPath", label: "Browse" },
    { name: "fileName", label: "File Name" },
    { name: "attachmentDate", label: "Attachment Date" },
  ];

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newRows = [...rows];
    newRows[index][name] = value;
    setRows(newRows);
  };

  const handleDeleteRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleAddRow = () => {
    const newRow = {
      itemNo: rows.length + 1,
      description: "",
      uomCode: "",
      quantity: "",
      unitPrice: "",
      taxCode: "",
      total: "",
    };
    setRows([...rows, newRow]);
  };

  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOptionSelect = (option) => {
    console.log(option);
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

  const handleDeleteRowA = (index) => {
    const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
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

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <div className={`${font.className}`}>
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
              Sales Quotation
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-2 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapDropDown
                  label="Customer:"
                  secondaryColor={secondaryColor}
                  option="Select Customer"
                  option1="Customer 1"
                  option2="Customer 2"
                  option3="Customer 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Name:"
                  option="Select Name"
                  option1="Name 1"
                  option2="Name 2"
                  option3="Name 3"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Contact Person:"
                  option="Select Contact Person"
                  option1="Person 1"
                  option2="Person 2"
                  option3="Person 3"
                />
                <SapTextField
                  label="Customer Ref. No"
                  secondaryColor={secondaryColor}
                />
                 <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Local Currency:"
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
                  {/* SapDropDown with label */}
                  <SapDropDown
                    label="Number:"
                    secondaryColor={secondaryColor}
                    style={{ width: "210px", padding: "0px 0px 0px 98px" }}
                  />

                  {/* SapTextField without label */}
                  <SapTextField
                    secondaryColor={secondaryColor}
                    width="160px" // You can adjust the width to match the dropdown width
                  />
                </div>

                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Status:"
                  option="Select Status"
                  option1="Open"
                  option2="Pending"
                  option3="Closed"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Posting Date"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Valid Until"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Document Date"
                />
              </div>
            </div>
          </Paper>

          <div className="mt-2 mb-0"></div>

          <Paper
            elevation={3}
            style={{
              backgroundColor: secondaryColor,
              border: "1px solid #d0d0d0",
              borderRadius: "8px",
              overflowX: "auto",
              width: "100%",
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
                label="Logistics"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Accounting"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Attachments"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
            </Tabs>

            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                width: "1217px",
              }}
            >
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
                <LogisticTab fields={fields} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <CxAccounting fields={accountingFields} />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
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
              marginTop: "4px",
            }}
          >
            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                  <SapDropDown
                    label="Sales Employee"
                    secondaryColor={secondaryColor}
                    option="Select Sales Employee"
                    option1="Employee 1"
                    option2="Employee  2"
                    option3="Employee 3"
                  />
                  <SapTextField label="Owner" secondaryColor={secondaryColor} />
                  <CxRemarks
                    label="Remarks"
                    secondaryColor={secondaryColor}
                  />
                </div>

              <div className="space-y-2" style={{ width: "450px" }}>
                {/* Total Before Discount */}
                <SapTextField
                  label="Total Before Discount:"
                  secondaryColor={secondaryColor}
                />

                {/* Discount */}
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
                      label="Discount:"
                      secondaryColor={secondaryColor}
                      style={{ width: "200px", padding: "0px 0px 0px 85px" }}
                    />
                    <span className="mt-2">%</span>
                    <SapTextField secondaryColor={secondaryColor}/>
                  </div>
                </div>

                {/* Freight */}
                <SapTextField
                  label="Freight:"
                  secondaryColor={secondaryColor}
                 
                />
                {/* Rounding */}
                <div className="flex ml-2 ">
                  <input
                    type="checkbox"
                   
                    
                  />
                  <div className=" ml-2" style={{ width: "500px",}}>
                    <SapTextField
                      label="Rounding:"
                      secondaryColor={secondaryColor}
                    
                    />
                  </div>
                </div>

                {/* Tax */}
                <SapTextField
                  label="Tax:"
                  secondaryColor={secondaryColor}
                />

                {/* Total Payment Due */}
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
