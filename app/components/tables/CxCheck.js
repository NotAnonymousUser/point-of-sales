import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SapDateField from "../fields/date/sapDateField";
import SapDropDown from "../fields/dropDown/customDropDown";
import SapTextField from "../fields/sapFields/sapTextField";

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

const CxCheck = ({
  tabValue,
  rows,
  primaryColor,
  handleInputChange,
  handleDeleteRow,
  handleAddRow,
  fieldConfigs,
  secondaryColor,
  index,
}) => {
  return (
    <TabPanel
      value={tabValue}
      index={index}
      style={{ padding: "0px", overflowY: "auto" }}
    >
      <div
        className="table-container"
        style={{
          overflowX: "auto", // Enables horizontal scrolling only within the table container
        }}
      >
        <div className="grid grid-cols-2 mb-2 mt-0 ml-1 mr-1">
          {/* Left-aligned Item/Service Type */}
          <div
            className="space-y-2 justify-self-start"
            style={{ width: "380px" }}
          >
            <h3>Cheque Clearing Account</h3>
            <SapTextField
              secondaryColor={secondaryColor}
              label="G/L Account:"
              option="Select Status"
              option2="Open"
              option3="Closed"
            />
            <div className="flex">
              <input type="checkbox" />
              <p className="text-sm ml-2">Search by Bank Account</p>
            </div>
          </div>

          {/* Right-aligned Summary Type */}
          <div
            className="space-y-2 justify-self-end"
            style={{ width: "350px" }}
          ></div>
        </div>
        <Table
          component={Paper}
          className="shadow-sm shadow-slate-800 px-12"
          style={{ marginBottom: "10px", marginTop: "8px" }}
        >
          <TableHead>
            <TableRow>
              <TableCell className="text-sm font-bold">S No.</TableCell>
              {fieldConfigs.map((field) => (
                <TableCell key={field.name} className="text-sm font-bold">
                  {field.label}
                </TableCell>
              ))}
              <TableCell className="text-sm font-bold text-center ml-4">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {fieldConfigs.map((field) => (
                  <TableCell key={field.name}>
                    {field.name === "requiredDate" ||
                    field.name === "quotedDate" ? (
                        <SapDateField
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                            />
                          )}
                        />
                    ) : (
                      <TextField
                        name={field.name}
                        value={row[field.name]}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        size="small"
                        inputProps={{
                          style: {
                            fontSize: "12px",
                            minWidth: "60px",
                            height: "10px",
                          },
                        }}
                      />
                    )}
                  </TableCell>
                ))}
                <TableCell className="flex justify-center">
                  <Button
                    onClick={() => handleAddRow(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                    }}
                  >
                    <IoMdAdd
                      size={30}
                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                    />
                  </Button>
                  <Button
                    onClick={() => handleDeleteRow(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                      "&:hover": { color: "red" },
                    }}
                  >
                    <RiDeleteBin6Line
                      size={30}
                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                    />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabPanel>
  );
};

export default CxCheck;
