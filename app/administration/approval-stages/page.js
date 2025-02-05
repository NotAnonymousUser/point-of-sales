"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useColor } from "@/app/context/ColorContext";
import {
  Paper,
  Box,
} from "@mui/material";
import { font } from "@/app/components/font/poppins";
import SapTextField from "@/app/components/fields/sapFields/sapTextField";
import CxStages from "@/app/components/tables/CxStages";
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
   
   
    { name: "departmentA", label: "Authorizer" },
    { name: "department", label: "Department" },
    
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
              Approval Stages
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "500px" }}>
                {/* Opportunity Type */}
        
                <SapTextField
                  label="Stage Name:"
                  secondaryColor={secondaryColor}
                />
                <SapTextField
                  label="Stage Description:"
                  secondaryColor={secondaryColor}
                />
                
                <SapTextField
                  label="No. of Approvals Required:"
                  secondaryColor={secondaryColor}
                />
             
                <SapTextField label="No. of Rejection Required:"
                 secondaryColor={secondaryColor} />

               
              </div>

              {/* Right Column */}
              
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
              padding:"0px",
              margin:"0px",
              width: "100%",
              height: "auto",
            }}
          >

            {/* Tab Panels */}
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <TabPanel value={tabValue} index={0}>
                <CxStages
                  tabValue={tabValue}
                  rows={rows}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  handleAddRow={handleAddRow}
                  fieldConfigs={fieldConfigs}
                  index={0}
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

                
              </div>
            </div>
          </Paper>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
