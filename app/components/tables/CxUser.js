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
} from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import SapDropDown from "../fields/dropDown/customDropDown";
import { useColor } from "@/app/context/ColorContext";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SapDateField from "../fields/date/sapDateField";

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

const CxUser = ({
  tabValue,
  rowsP,
  primaryColor,
  handleInputChangeP,
  handleDeleteRowP,
  handleAddRowP,
  fieldConfigsP,
  secondaryColor,
  index
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
          overflowX: "auto",  // Enables horizontal scrolling only within the table container

        }}
      >
            
        <Table component={Paper} className="shadow-sm shadow-slate-800 px-12"
        style={{ marginBottom:"0px" , marginTop: "0px",}}
        >
          <TableHead>
            <TableRow>
              <TableCell className="text-sm font-bold">S No.</TableCell>
              {fieldConfigsP.map((field) => (
                <TableCell key={field.name} className="text-sm font-bold">
                  {field.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsP.map((rowP, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {fieldConfigsP.map((field) => (
                  <TableCell key={field.name}>
                    {field.name === "requiredDate" || field.name === "quotedDate" ? (
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
                        value={rowP[field.name]}
                        onChange={(e) => handleInputChangeP(rowIndex, e)}
                        size="small"
                        inputProps={{ style: { fontSize: "12px" , minWidth: "60px" , height: "10px"} }}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabPanel>
  );
};

export default CxUser;
