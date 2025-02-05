"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import CxAttachment from "@/app/components/tables/CxAttachment";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxRadio from "@/app/components/buttons/CxRadio/CxRadio";
import CxGeneral from "@/app/components/tables/CxGeneral";
import CxActivities from "@/app/components/tables/CxActivities";
import CxService from "@/app/components/tables/CxService";

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
      requiredDate: null, // This will be set using DatePicker
      quotedDate: null, // This will be set using DatePicker
      g_LAccount: "",
      g_LAccountName: "",
      taxCode: "",
      total: "",
    },
  ]);
  const [rowsS, setRowsS] = useState([
    {
      item: "",
      itemDescription: "",
      quantity: "",
      requiredDate: null, // This will be set using DatePicker
      quotedDate: null, // This will be set using DatePicker
      g_LAccount: "",
      g_LAccountName: "",
      taxCode: "",
      total: "",
    },
  ]);
  const [rowsD, setRowsD] = useState([
    {
      item: "",
      itemDescription: "",
      quantity: "",
      requiredDate: null, // This will be set using DatePicker
      quotedDate: null, // This will be set using DatePicker
      g_LAccount: "",
      g_LAccountName: "",
      taxCode: "",
      total: "",
    },
  ]);
  const [rowsH, setRowsH] = useState([
    {
      item: "",
      itemDescription: "",
      quantity: "",
      requiredDate: null, // This will be set using DatePicker
      quotedDate: null, // This will be set using DatePicker
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
  const handleInputChangeS = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsS];
    updatedRows[index][name] = value;
    setRowsS(updatedRows);
  };
  const handleInputChangeD = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsD];
    updatedRows[index][name] = value;
    setRowsD(updatedRows);
  };
  const handleInputChangeH = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsH];
    updatedRows[index][name] = value;
    setRowsH(updatedRows);
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
  const handleAddRowS = () => {
    setRowsS([
      ...rowsS,
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
  const handleAddRowD = () => {
    setRowsD([
      ...rowsD,
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
  const handleAddRowH = () => {
    setRowsH([
      ...rowsH,
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
  const handleDeleteRowS = (index) => {
    const updatedRows = rowsS.filter((_, rowIndex) => rowIndex !== index);
    setRowsS(updatedRows);
  };
  const handleDeleteRowD = (index) => {
    const updatedRows = rowsD.filter((_, rowIndex) => rowIndex !== index);
    setRowsD(updatedRows);
  };
  const handleDeleteRowH = (index) => {
    const updatedRows = rowsH.filter((_, rowIndex) => rowIndex !== index);
    setRowsH(updatedRows);
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
    { name: "Selected", label: "Selected" },
    { name: "documentNo", label: "Document No." },
    { name: "installed", label: "Installed" },
    { name: "documentType", label: "Document Type" },
    { name: "requiredDate", label: "Date" },
    { name: "total", label: "Total" },
    { name: "wTax Amount", label: "WTax Amount" },
    { name: "balanceDue", label: "Balance Due" },
    { name: "cashDiscount", label: "Cash Discount %" },
    { name: "totalRoundingAmount", label: "Total Rounding Amount" },
    { name: "totalPayment", label: "Total Payment" },
    { name: "overdueDays", label: "Overdue Days" },
    { name: "blocked", label: "Blocked" },
    { name: "paymentOrderRun", label: "Payment Order Run" },
    { name: "blanketAgreement", label: "Blanket Agreement" },
  ];
  // Attachment
  const fieldConfigsA = [
    { name: "targetPath", label: "Browse" },
    { name: "fileName", label: "File Name" },
    { name: "attachmentDate", label: "Attachment Date" },
  ];

  const radioOptions = [
    { label: "Sales", value: "sales", link: "/Service/equipment-card" },
    { label: "Purchasing", value: "purchasing", link: "/Service/purchasing-ec" }, // Link to the account page
  ];

  const generalFields = [
    { section: "left", type: "text", label: "Street", name: "street" },
    { section: "left", type: "text", label: "Street No.", name: "streetNo." },
    { section: "left", type: "text", label: "Building/Floor/Room",  },
    { section: "left", type: "text", label: "Zip Code",  },
    { section: "left", type: "text", label: "Block",  },
    { section: "left", type: "text", label: "City",  },
    { section: "left", type: "dropdown", label: "State", name:"state" },
    { section: "left", type: "text", label: "Country",  },
    { section: "left", type: "dropdown", label: "Country/Region", name:"countryRegion" },
  
    
  
    { section: "remarks", type: "remarks", label: "Location", name: "location" },
  ];

  const salesFields = [
    { section: "left", type: "heading", label: "Buyer" },
    { section: "right", type: "headingin", label: "Buyer" },
    { section: "left", type: "text", label: "Code", name: "code" },
    { section: "left", type: "text", label: "Name", name: "name" },
    { section: "right", type: "text", label: "Delivery" },
    { section: "right", type: "text", label: "Invoice", name: "invoice" },
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
      type: "textf",
      label: "Territory:",
      name: "territory",
    },

    {
      type: "textfield",
      label: "Contact Person:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Tel 1:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Tel 2:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Mobile Phone:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Fax:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "E-mail:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Business Partner Project:",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
  ];
  const fieldConfigsAc = [
    { name: "callID", label: "Call ID" },
    { name: "requiredDate", label: "Creation Date" },
    { name: "subject", label: "Subject" },
    { name: "itemNo", label: "Item No" },
    { name: "sn", label: "SN" },
    { name: "customerName", label: "Customer Name" },
    { name: "status", label: "Status" },  
  ];
  const fieldConfigsS = [
    { name: "contract", label: "Contract" },
    { name: "requiredDate", label: "Start Date" },
    { name: "requiredDate", label: "End Date" },
    { name: "requiredDate", label: "Termination Date" },
    { name: "serviceType", label: "Service Type" },
  ];
  const fieldConfigsD = [
    { name: "documentType", label: "Document Type" },
    { name: "documentNo", label: "Document No." },
    { name: "createdOn", label: "Created On" },
    { name: "requiredDate", label: "Date" },
    { name: "itemNo", label: "Item No." },
    { name: "quantity", label: "Quantity" },  
    { name: "fromWhse", label: "From Whse" },  
    { name: "toWhse", label: "To Whse" },  
  ];
  const fieldConfigsH = [
    { name: "transNo", label: "Trans. No." },
    { name: "service", label: "Service" },
    { name: "documentNo", label: "Document No." },
    { name: "rowNo", label: "Row No." },
    { name: "requiredDate", label: "Date" },
    { name: "whse", label: "Whse" },  
    { name: "glAcctBpCode", label: "G/L Acct/BP Code" },  
    { name: "g/LAcctBpname", label: "G/L Acct/BP Name" },  
    { name: "direction", label: "Direction" },  
 
  ];
  const fieldsS = [
    {
      section: "left",
      type: "ddtt",
      label: "Start Time",
    },
    {
      section: "left",
      type: "ddtt",
      label: "End Time",
    },

    {
      section: "left",
      type: "textfield",
      label: "Duration",
    },
    {
      section: "left",
      type: "cbfield",
      label: "Reminder",
      name:"reminder"
    },
    {
      section: "left",
      type: "checkbox",
      label: "Display in Calander",
      name:"displayincalander"
    },
    {
      type: "dropdown",
      label: "Meeting Location",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Street",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "City",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "textfield",
      label: "Room",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "dropdown",
      label: "State",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
    {
      type: "dropdown",
      label: "Country/Region",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
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
              Equipment Card
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <CxRadio
                  fieldLabel="Equipment Type"
                  options={radioOptions}
                />
                <SapTextField
                  label="Mfr Serial No."
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Serial Number"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Item No."
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Item Description"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Business Partner Code"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Business Partner Name"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Contact Person"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Telephone No."
                  secondaryColor={secondaryColor}
                />
              </div>

              {/* Right column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Status"
                />
                <SapTextField
                  secondaryColor={secondaryColor}
                  label="Previous SN"
                />
                <SapTextField
                  secondaryColor={secondaryColor}
                  label="New SN"
                />
                <SapTextField
                  label="Technician"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Territory"
                  secondaryColor={secondaryColor}
                />
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
                label="Address"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Service Call"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Service Contracts"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Sales Data"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Transactions"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Attachment"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
            </Tabs>

            {/* Tab Panels */}
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                width: "1217px",
              }}
            >
              <TabPanel value={tabValue} index={0}>
                <CxGeneral
                  tabValue={tabValue}
                  fields={generalFields}
                  secondaryColor={secondaryColor}
                  index={0}
                />
              </TabPanel>
              <TabPanel>
                <CxService 
                tabValue={tabValue}
                rows={rows}
                primaryColor={primaryColor}
                handleInputChange={handleInputChange}
                handleDeleteRow={handleDeleteRow}
                handleAddRow={handleAddRow}
                fieldConfigs={fieldConfigsAc}
                index={1}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <CxActivities 
                tabValue={tabValue}
                rows={rowsS}
                primaryColor={primaryColor}
                handleInputChange={handleInputChangeS}
                handleDeleteRow={handleDeleteRowS}
                handleAddRow={handleAddRowS}
                fieldConfigs={fieldConfigsS}
                index={2}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
              <CxGeneral
                  tabValue={tabValue}
                  fields={salesFields}
                  secondaryColor={secondaryColor}
                  index={3}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <CxActivities
                tabValue={tabValue}
                rows={rowsH}
                primaryColor={primaryColor}
                handleInputChange={handleInputChangeH}
                handleDeleteRow={handleDeleteRowH}
                handleAddRow={handleAddRowH}
                fieldConfigs={fieldConfigsH}
                 index={4}/>
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
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
            

            {/* Buttons Section */}
            <div style={{ marginTop: "20px", marginRight: "20px" }}>
              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  width: "100%",
                }}
              >
                <div
                  style={{ display: "flex", gap: "8px", marginLeft: "10px" }}
                >
                  <CustomButton
                    title="Find"
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
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
