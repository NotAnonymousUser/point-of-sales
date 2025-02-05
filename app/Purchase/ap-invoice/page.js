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
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import SapDateField from "@/app/components/fields/date/sapDateField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxContents from "@/app/components/tables/CxContents";
import CxAttachment from "@/app/components/tables/CxAttachment";
import LogisticTab from "@/app/components/tables/CxLogistic";
import CxAccounting from "@/app/components/tables/CxAccounting";
import CxRemarks from "@/app/components/fields/CXremarks/CxRemarks";
import FileUploadButton from "@/app/components/buttons/fileUploadButton/fileUploadButton";

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
    const updatedRows = rows.filter((_, i) => i !== index);
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
  // LOGISTICS
const [rowsL, setRowsL] = useState([
  {
    itemNo: 1,
    targetpath: "",
    filename: "",
    attacheddate: "",
    freetext: "",
    copytotargetdocument: "",
  },
]);

const handleDeleteRowL = (index) => {
  const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
  setRowsL(updatedRows);
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
    { name: "item", label: "Item No." },
    { name: "itemdescription", label: "Item Description" },
    { name: "quantity", label: "Quantity" },
    { name: "uomcode", label: "UoM Code" },
    { name: "unitPrice", label: "Unit Price" },
    { name: "discount%", label: "Discount %" },
    { name: "taxcode", label: "Tax Code" },      
    { name: "wTaxLiable", label: "WTax Liable" },
    { name: "total", label: "Total" },
    { name: "qty(inventoryuom", label: "QTY(Inventory UoM)" },
    { name: "warehouse", label: "Warehouse" },
    { name: "taxamount", label: "Tax Amount" },
    { name: "binlocationallocation", label: "Bin Location Allocation" },     
  ];
  // Attachment
  const fieldConfigsA = [
    { name: "targetPath", label: "Browse" },
    { name: "fileName", label: "File Name" },
    { name: "attachmentDate", label: "Attachment Date" },
  ];
  // logistic
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
      label: "Pay To",
      showUploadButton: true,
      name: "payTo",
    },
    {
      section: "left",
      type: "dropdown",
      label: "Shipping Type",
      name: "shippingType",
    },
    { section: "right", type: "dropdown", label: "Language", name: "language" },
    { section: "right", type: "text", label: "Stamp No.", name: "Stamp No." },
   
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
      { type: "text", label: "Cash Discount Date Offset:", style: { width: "100%" } },
      { type: "dropdown", label: "Consolidation Type", width: "100%" },
      { type: "text", label: "Consolidating BP", width: "100%" },
    ],
    rightFields: [
      { type: "text", label: "Business Partner Project:", style: { width: "100%" } },
      { type: "remarks", label: "Create QR Code From", style: { width: "100%" } },
      { type: "dropdown", label: "Indicator", width: "100%" },
      { type: "text", label: "Federal Tax ID", style: { width: "100%" } },
      { type: "text", label: "Order Number", style: { width: "100%" } },
      
    ],
    fileUploadLabel: "Referenced Document:",
  };

  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [freight, setFreight] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPaymentDue, setTotalPaymentDue] = useState(0);
  const [roundingEnabled, setRoundingEnabled] = useState(false);
  const [roundedValue, setRoundedValue] = useState(0);

  // Calculate discount and update total
  const calculateDiscount = (discountValue) => {
    const discountAmount = (totalBeforeDiscount * discountValue) / 100;
    const totalAfterDiscount = totalBeforeDiscount - discountAmount;
    updateTotalPaymentDue(totalAfterDiscount);
  };

  // Update the total payment due with other values
  const updateTotalPaymentDue = (value) => {
    let total =
      parseFloat(value) + parseFloat(freight || 0) + parseFloat(tax || 0);
    if (roundingEnabled) {
      total = Math.round(total);
    }
    setTotalPaymentDue(total);
    setRoundedValue(total);
  };


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
              A/P Invoice
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapDropDown
                  label="Vendor:"
                  secondaryColor={secondaryColor}
                  option="Select Vendor"
                  option1="Vendor 1"
                  option2="Vendor 2"
                  option3="Vendor 3"
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
                  label="Vendor Ref. No"
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
                  label="Due Date"
                />
                <SapDateField
                  secondaryColor={secondaryColor}
                  label="Document Date"
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
                label="Logistics"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Accounting"
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
              width: "100%",
              height: "100%",
              marginTop: "4px",
            }}
          >
            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                  <SapDropDown
                    label="Buyer"
                    secondaryColor={secondaryColor}
                    option="Select Buyer"
                    option1="Buyer 1"
                    option2="Buyer 2"
                    option3="Buyer 3"
                  />
                  <SapTextField label="Owner" secondaryColor={secondaryColor} />
                  <CxRemarks
                    label="Remarks"
                    secondaryColor={secondaryColor}
                  />
                </div>

                <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* right column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                  <SapTextField
                    label="Total Before Discount"
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
                    <SapTextField secondaryColor={secondaryColor} />
                  </div>
                </div>
                <div className="flex" style={{ alignItems: "center" }}>
                <FileUploadButton label="..." />
                <div className="ml-2" style={{ width: "500px" }}>
                  <SapTextField label="Total Down Payment" secondaryColor={secondaryColor} />
                </div>
                </div>

                {/* Freight */}
                <SapTextField
                  label="Freight"
                  secondaryColor={secondaryColor}
                  value={freight}
                 
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
                  <SapTextField label="Tax" secondaryColor={secondaryColor} />
                  <SapTextField
                    label="WTax Amount"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField
                    label="Total Payment Due"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField
                    label="Applied Account"
                    secondaryColor={secondaryColor}
                  />
                  <SapTextField
                    label="Balance Due"
                    secondaryColor={secondaryColor}
                  />
                </div>
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
