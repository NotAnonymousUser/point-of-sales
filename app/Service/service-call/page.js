"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import CxRemarks from "@/app/components/fields/CXremarks/CxRemarks";
import CxAttachment from "@/app/components/tables/CxAttachment";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import SapDateField from "@/app/components/fields/date/sapDateField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxRadio from "@/app/components/buttons/CxRadio/CxRadio";
import Cxtime from "@/app/components/fields/CXtime/Cxtime";
import CxGeneral from "@/app/components/tables/CxGeneral";
import CxBP from "@/app/components/tables/CxBP";
import CxActivities from "@/app/components/tables/CxActivities";
import CxHistory from "@/app/components/tables/CxHistory";
import LogisticTab from "@/app/components/tables/CxLogistic";

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
    { label: "Sales", value: "sales", link: "/Service/service-call" },
    { label: "Purchasing", value: "purchasing", link: "/Service/purchasing" }, // Link to the account page
  ];

  const generalFields = [
    { section: "left", type: "dropdown", label: "Origin", name: "origin" },
    { section: "left", type: "dropdown", label: "Problem Type", name: "problemType" },
    { section: "left", type: "dropdown", label: "Problem Subtype", name: "problemSubtype" },
    { section: "left", type: "dropdown", label: "Call Type", name: "callType" },
    { section: "left", type: "dropdown", label: "Technician", name: "technician" },
    {
      name: "field1",
      type: "radio",
      label: "Handled By", // This label will be passed to the SapTextField
      width:"250px",
      options: [
        { label: "", value: "option1" }, // No label for the radio button
      ],
      section: "right",
    },
    {
      name: "field2",
      type: "radio",
      label: "Queue", // This label will be passed to the SapTextField
      width:"250px",

      options: [
        { label: "", value: "option1" }, // No label for the radio button
      ],
      section: "right",
    },
    { section: "right", type: "heading", label: "Response" },
    { section: "right", type: "date", label: "By", name: "by" },
    { section: "right", type: "date", label: "On", name: "on" },
    { section: "right", type: "heading", label: "Resolution" },
    { section: "right", type: "date", label: "By", name: "by" },
    { section: "right", type: "date", label: "On", name: "on" },
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
  const fieldConfigsAc =   [
    { name: "requiredDate", label: "Date" },
    { name: "time", label: "Time" },
    { name: "salesEmployee", label: "Handled By" },
    { name: "requiredDate", label: "Activity Date" },
    { name: "recurrence", label: "Recurrence" },
    { name: "content", label: "Content" },  
  ];
  const fieldConfigsS = [
    { name: "id", label: "ID" },
    { name: "solution", label: "Solution" },
    { name: "createdOn", label: "Created On" },
    { name: "owner", label: "Owner" },
    { name: "status", label: "Status" },
    { name: "handleBy", label: "Handle By" },  
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
    { name: "requiredDate", label: "Date Of Update" },
    { name: "updatetime", label: "Update time" },
    { name: "updatedBy", label: "Updated By" },
    { name: "description", label: "Description" },
    { name: "PreviousValue", label: "Previous Value" },
    { name: "newValue", label: "New Value" },  
 
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
              Service Call
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <CxRadio
                  fieldLabel="Service Call Type:"
                  options={radioOptions}
                />
                <SapTextField
                  label="Business Partner Code:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Business Partner Name:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Contact Person:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Telephone No."
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Business Partner Ref.No."
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Mfr Serial No."
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Serial Number."
                  secondaryColor={secondaryColor}
                />
                <SapTextField label="Item:" secondaryColor={secondaryColor} />
                <SapTextField
                  label="Description:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Item Group:"
                  secondaryColor={secondaryColor}
                />
                <CxRemarks label="Subject" secondaryColor={secondaryColor} />
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
                  <SapTextField secondaryColor={secondaryColor} />
                </div>
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Call Status:"
                />
                <SapTextField
                  secondaryColor={secondaryColor}
                  label="Call ID:"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Priority:"
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0px",
                  }}
                >
                  <SapDateField
                    label="Created On:"
                    secondaryColor={secondaryColor}
                    style={{ width: "342px", padding: "0px 0px 0px 2px" }}
                    labelStyle={{ marginRight: "55px" }} // Custom marginRight
                  />

                  <Cxtime secondaryColor={secondaryColor} />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "0px",
                  }}
                >
                  <SapDateField
                    label="Closed On:"
                    secondaryColor={secondaryColor}
                    style={{ width: "342px", padding: "0px 0px 0px 2px" }}
                    labelStyle={{ marginRight: "55px" }} // Custom marginRight
                  />

                  <Cxtime secondaryColor={secondaryColor} />
                </div>
                <SapTextField
                  label="Contract No."
                  secondaryColor={secondaryColor}
                />
                <SapDateField
                  label="End Date:"
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
                label="General"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Business Partner"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Remarks"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Activities"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Solutions"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Related Documents"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Resolution"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="History"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft: "5px" }}
              />
              <Tab
                label="Scheduling"
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

              <TabPanel value={tabValue} index={1}>
                <CxBP fields={fields} />
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <CxRemarks label="Remarks" />
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <CxActivities 
                tabValue={tabValue}
                rows={rows}
                primaryColor={primaryColor}
                handleInputChange={handleInputChange}
                handleDeleteRow={handleDeleteRow}
                handleAddRow={handleAddRow}
                fieldConfigs={fieldConfigsAc}
                index={3}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={4}>
                <CxActivities 
                tabValue={tabValue}
                rows={rowsS}
                primaryColor={primaryColor}
                handleInputChange={handleInputChangeS}
                handleDeleteRow={handleDeleteRowS}
                handleAddRow={handleAddRowS}
                fieldConfigs={fieldConfigsS}
                index={4}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={5}>
                <CxActivities 
                tabValue={tabValue}
                rows={rowsD}
                primaryColor={primaryColor}
                handleInputChange={handleInputChangeD}
                handleDeleteRow={handleDeleteRowD}
                handleAddRow={handleAddRowD}
                fieldConfigs={fieldConfigsD}
                index={5}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
                <CxRemarks label="Resolution" />
              </TabPanel>
              <TabPanel value={tabValue} index={7}>
                <CxHistory
                tabValue={tabValue}
                rows={rowsH}
                primaryColor={primaryColor}
                handleInputChange={handleInputChangeH}
                handleDeleteRow={handleDeleteRowH}
                handleAddRow={handleAddRowH}
                fieldConfigs={fieldConfigsH}
                 index={7}/>
              </TabPanel>
              <TabPanel value={tabValue} index={8}>
                <LogisticTab fields={fieldsS} />
              </TabPanel>
              <TabPanel value={tabValue} index={9}>
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
                    title="Add"
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
