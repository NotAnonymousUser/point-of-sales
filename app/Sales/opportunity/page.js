"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useColor } from "@/app/context/ColorContext";
import Checkbox from "@mui/material/Checkbox";
import {
  Grid,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { font } from "@/app/components/font/poppins";
import AddButton from "@/app/components/buttons/addButton/addButton";
import { IoMdAdd } from "react-icons/io";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import SapDropDown from "@/app/components/fields/dropDown/customDropDown";
import CxContents from "@/app/components/tables/CxGeneral";
import CxGeneral from "@/app/components/tables/CxGeneral";
import CxStages from "@/app/components/tables/CxStages";
import CxParnters from "@/app/components/tables/CxPartners";
import CxCompetitors from "@/app/components/tables/CxCompetitors";
import CxSummary from "@/app/components/tables/CxSummary";
import CxAttachment from "@/app/components/tables/CxAttachment";
import SapDateField from "@/app/components/fields/date/sapDateField";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import CxPotential from "@/app/components/tables/CxPotential";
import CxRadio from "@/app/components/buttons/CxRadio/CxRadio";

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
      {value === index && <Box p={1}>{children}</Box>}
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
  const [rowsO, setRowsO] = useState([
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
  const [rowsA, setRowsA] = useState([
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
  const handleInputChangeP = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsP];
    updatedRows[index][name] = value;
    setRowsP(updatedRows);
  };
  const handleInputChangeO = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsP];
    updatedRows[index][name] = value;
    setRowsP(updatedRows);
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
  const handleAddRowP = () => {
    setRowsP([
      ...rowsP,
      {
        itemNo: rowsP.length + 1,
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
  const handleAddRowO = () => {
    setRowsO([
      ...rowsO,
      {
        itemNo: rowsO.length + 1,
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

  const handleAddRowC = () => {
    setRowsC([
      ...rowsC,
      {
        itemNo: rowsP.length + 1,
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
  const handleDeleteRowP = (index) => {
    const updatedRows = rowsP.filter((_, rowIndex) => rowIndex !== index);
    setRowsP(updatedRows);
  };
  const handleDeleteRowO = (index) => {
    const updatedRows = rowsO.filter((_, rowIndex) => rowIndex !== index);
    setRowsO(updatedRows);
  };

  const [rowsP, setRowsP] = useState([
    {
      itemNo: 1,
      targetpath: "",
      filename: "",
      attacheddate: "",
      freetext: "",
      copytotargetdocument: "",
    },
  ]);
  const [rowsC, setRowsC] = useState([
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
  const handleInputChangeC = (index, e) => {
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
  const handleAddRowS = () => {
    setRowsS([
      ...rowsS,
      {
        itemNo: rowsS.length + 1,
        targetpath: "",
        filename: "",
        attacheddate: "",
        freetext: "",
        copytotargetdocument: "",
      },
    ]);
  };

  const handleDeleteRowC = (index) => {
    const updatedRows = rowsC.filter((_, rowIndex) => rowIndex !== index);
    setRowsC(updatedRows);
  };

  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCopyFromDropdown, setShowCopyFromDropdown] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Add");
  const [copyFromOption, setCopyFromOption] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteRowA = (index) => {
    const updatedRows = rowsA.filter((_, rowIndex) => rowIndex !== index);
    setRowsA(updatedRows);
  };
  const handleDeleteRowS = (index) => {
    const updatedRows = rowsS.filter((_, rowIndex) => rowIndex !== index);
    setRowsS(updatedRows);
  };

  const fieldConfigs = [
    { name: "requiredDate", label: "Start Date" },
    { name: "quotedDate", label: "Closing Date." },
    { name: "salesEmployee", label: "Sales Employee" },
    { name: "taxCode", label: "Stage" },
    { name: "t", label: "%" },
    { name: "total", label: "Potential Amount" },
    { name: "total", label: "Weighted Amount" },
    { name: "total", label: "Show BPs Docs" },
    { name: "total", label: "Document Type" },
    { name: "total", label: "Doc. No" },
    { name: "total", label: "Activities" },
    { name: "total", label: "Owner" },
  ];
  const fieldConfigsP = [
    { name: "salesEmployee", label: "Name" },
    { name: "relationship", label: "Relationship" },
    { name: "relatedBP", label: "Related BP" },
    { name: "total", label: "Remarks" },
  ];
  const fieldConfigsC = [
    { name: "salesEmployee", label: "Name" },
    { name: "relationship", label: "Thread Level" },
    { name: "relatedBP", label: "Remarks" },
    { name: "won", label: "Won" },
  ];
  const fieldConfigsA = [
    { name: "targetPath", label: "Browse" },
    { name: "fileName", label: "File Name" },
    { name: "attachmentDate", label: "Attachment Date" },
  ];

  const radioOptions = [
    { label: "Sales", value: "sales" },
    { label: "Purchasing", value: "purchasing" },
  ];

  const generalFields = [
    { section: "left", type: "text", label: "BP Channel Code", name: "bpChannelCode" },
    { section: "left", type: "text", label: "BP Channel Name", name: "bpChannelName" },
    { section: "left", type: "dropdown", label: "BP Channel Content", name: "bpChannelContent" },
  
    { section: "right", type: "text", label: "Business Partner Project", name: "bpProject" },
    { section: "right", type: "dropdown", label: "Information Source", name: "infoSource" },
    { section: "right", type: "dropdown", label: "Industry", name: "industry" },
  
    
  
    { section: "remarks", type: "remarks", label: "Remarks", name: "remarks" },
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
              Opportunity
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                {/* Opportunity Type */}
                <CxRadio fieldLabel="Opportunity Type:" options={radioOptions} />
                <SapTextField
                  label="Business Partner Code:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Business Partner Name:"
                  secondaryColor={secondaryColor}
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Contact Person:"
                />
                <SapTextField
                  label="Total Amount Invoiced:"
                  secondaryColor={secondaryColor}
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Bus. Partner Territory:"
                />
                <SapDropDown
                  secondaryColor={secondaryColor}
                  label="Sales Employee:"
                />
                <SapTextField label="Owner:" secondaryColor={secondaryColor} />

                {/* Display in System Currency */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "4px",
                    backgroundImage: `linear-gradient(to bottom, white 10%,  gray 300%)`,  
                    borderRadius: "6px",
                    border: "2px solid #ccc",
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
                    Display in System Currency
                  </label>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapTextField
                  label="Opportunity Name:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Opportunity No:"
                  secondaryColor={secondaryColor}
                />
                <SapDropDown secondaryColor={secondaryColor} label="Status:" />
                <SapDateField
                  label="Start Date:"
                  secondaryColor={secondaryColor}
                />
                <SapDateField
                  label="Closing Date:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  secondaryColor={secondaryColor}
                  label="Open Activities:"
                />
                <SapTextField
                  secondaryColor={secondaryColor}
                  label="Closing %"
                />
              </div>
            </div>
          </Paper>

          <div className="mt-2 mb-0"></div>

          {/* Middle Tab section */}

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
                label="Potential"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="General"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Stages"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Partners"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Competitors"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Summary"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
              <Tab
                label="Attachments"
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
              <TabPanel value={tabValue} index={0} style={{ padding: "0px" }}>
                <CxPotential
                  rowsO={rowsO}
                  handleInputChangeO={handleInputChangeO}
                  handleAddRowO={handleAddRowO}
                  handleDeleteRowO={handleDeleteRowO}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                
              <CxGeneral tabValue={tabValue} fields={generalFields} secondaryColor={secondaryColor} index={1} />

              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <CxStages
                  tabValue={tabValue}
                  rows={rows}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  handleAddRow={handleAddRow}
                  fieldConfigs={fieldConfigs}
                  index={2}
                />
              </TabPanel>
              <TabPanel>
                <CxParnters
                  tabValue={tabValue}
                  rowsP={rowsP}
                  primaryColor={primaryColor}
                  handleInputChangeP={handleInputChangeP}
                  handleDeleteRowP={handleDeleteRowP}
                  handleAddRowP={handleAddRowP}
                  fieldConfigsP={fieldConfigsP}
                />
              </TabPanel>
              <TabPanel>
                <CxCompetitors
                  tabValue={tabValue}
                  rowsC={rowsC}
                  primaryColor={primaryColor}
                  handleInputChangeC={handleInputChangeC}
                  handleDeleteRowC={handleDeleteRowC}
                  handleAddRowC={handleAddRowC}
                  fieldConfigsC={fieldConfigsC}
                />
              </TabPanel>
              <TabPanel value={tabValue} index={5} style={{ padding: "0px" }}>
              <CxSummary
                   rowsS={rowsS}
                   handleInputChangeS={handleInputChangeS}
                   handleAddRowS={handleAddRowS}
                   handleDeleteRowS={handleDeleteRowS}
                   secondaryColor={secondaryColor}
                   primaryColor={primaryColor}
                      />
              </TabPanel>
              <TabPanel value={tabValue} index={6}>
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
            {/* Bottom sections */}

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

                <div style={{ display: "flex", gap: "8px" }}>
                  {/* Copy From and Copy To Buttons */}
                  <CustomButton
                    primaryEnabled={true}
                    title="Related Activites"
                    padding="8px"
                    fontsize="12px"
                    disabled={true} // Disable this button
                  />
                  <CustomButton
                    primaryEnabled={true}
                    title="Related Document"
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
