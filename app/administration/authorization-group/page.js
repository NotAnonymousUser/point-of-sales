"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import CxRemarks from "@/app/components/fields/CXremarks/CxRemarks";
import CxContents from "@/app/components/tables/CxContents";
import CxAttachment from "@/app/components/tables/CxAttachment";
import LogisticTab from "@/app/components/tables/CxLogistic";
import CxAccounting from "@/app/components/tables/CxAccounting";
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
import CxStages from "@/app/components/tables/CxStages";
import CxUserGroup from "@/app/components/tables/CxUserGroup";

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


  const [rows, setRows] = useState([
    {
      groupName: "",
      description: "",
    },
  ]);

  const handleInputChange = (index, e) => {

    const { name, value } = e.target;
    console.log({name,value})
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        groupName: "",
        description: "",
      },
    ]);
  };
  const handleAddRowP = () => {
    setRowsA([
      ...rowsA,
      {
        userCode: "",
        userName: "",
        department: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };  
  const handleDeleteRowP = (index) => {
    const updatedRows = rowsA.filter((_, i) => i !== index);
    setRowsA(updatedRows);
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
  const handleInputChangeP = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rowsA];
    updatedRows[index][name] = value;
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



  const { secondaryColor, primaryColor } = useColor();
  const [tabValue, setTabValue] = useState(0);
  const [, setShowDropdown] = useState(false);
  const [, setShowCopyFromDropdown] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Add and Close");
  const [copyFromOption, setCopyFromOption] = useState("");

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };





  const fieldConfigs = [
    { name: "groupName", label: "Group Name" },
    { name: "description", label: "Description." },
  ];
  const fieldConfigsP = [
    { name: "userCode", label: "User Code" },
    { name: "userName", label: "User Name" },
    { name: "departments", label: "Department" },
  ];

  const addToRow = ()  => {
    console.log(newRow)

    if (newRow.groupName){
      setRows(prestate=>([...prestate,{...newRow, disabled:true}]))
      setNewRow({
        groupName: "",
        description: "",
      })
    }
  }
  const onNewRowChange = (value,key) => {
    setNewRow(presState=>({
      ...presState,
      [key]:value
    }))
  }
  const [newRow,setNewRow] = useState({
      groupName: "",
      description: "",
    });

  const [totalBeforeDiscount, setTotalBeforeDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [freight, setFreight] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPaymentDue, setTotalPaymentDue] = useState(0);
  const [roundingEnabled, setRoundingEnabled] = useState(false);
  const [roundedValue, setRoundedValue] = useState(0);

  // Calculate discount and update total

  // Update the total payment due with other values

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
              Authorization Groups
            </p>
            <hr className="border-t-2 border-gray-700 mt-5" />

            <div className="grid grid-cols-2 mt-2 ml-2 mr-8 gap-72">
              {/* Left column */}
              <div className="space-y-2" style={{ width: "450px" }}>
                <SapTextField label="Group Name:" secondaryColor={secondaryColor} value={newRow.groupName} onChange={ (text)=> onNewRowChange(text,"groupName")}/>
                <SapTextField label="Description:" secondaryColor={secondaryColor} value={newRow.description} onChange={ (text)=> onNewRowChange(text,"description")}  />  
                <CustomButton
                    primaryEnabled={true}
                    title="Add"
                    padding="6px 12px"
                    fontsize="12px"
                    func={addToRow}
                    disabled={false} // Disable this button
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
                label="User Groups"
                sx={{ fontWeight: "bold", fontSize: "12px", marginLeft:"10px" }}
              />
              <Tab
                label="Add User"
                sx={{ fontWeight: "bold", fontSize: "12px" }}
              />
            </Tabs>

            {/* Tab Panels */}
            <div style={{ overflowX: "auto", whiteSpace: "nowrap" ,width:"1217px"}}>
              <TabPanel value={tabValue} index={0}>
              <CxUserGroup
                  tabValue={tabValue}
                  rows={rows}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChange}
                  handleDeleteRow={handleDeleteRow}
                  handleAddRow={handleAddRow}
                  fieldConfigs={fieldConfigs}
                  index={0}
                  isEditable={false} // Change to true when you want to allow editing
                />
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
              <CxStages
                  tabValue={tabValue}
                  rows={rowsA}
                  primaryColor={primaryColor}
                  handleInputChange={handleInputChangeP}
                  handleDeleteRow={handleDeleteRowP}
                  handleAddRow={handleAddRowP}
                  fieldConfigs={fieldConfigsP}
                  index={1}
                />              </TabPanel>
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
                <div style={{ display: "flex", gap: "8px", marginLeft:  "10px" }}>


                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  {/* Copy From and Copy To Buttons */}
                  <CustomButton
                    primaryEnabled={true}
                    title="Save"
                    padding="6px 12px"
                    fontsize="12px"
                    disabled={false} // Disable this button
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
