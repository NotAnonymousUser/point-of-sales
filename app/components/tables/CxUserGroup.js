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

const CxUserGroup = ({
    tabValue,
    rows,
    primaryColor,
    handleInputChange,
    handleDeleteRow,
    handleAddRow,
    fieldConfigs,
    secondaryColor,
    index,
    isEditable = false, // Add this prop to control editability
  }) => {
    console.log(rows);
    return (
      <TabPanel
        value={tabValue}
        index={index}
        style={{ padding: "0px", overflowY: "auto" }}
      >
        <div
          className="table-container"
          style={{
            overflowX: "auto",
          }}
        >
          <Table
            component={Paper}
            className="shadow-sm shadow-slate-800 px-12"
            style={{ marginBottom: "10px", marginTop: "8px" }}
          >
            <TableHead>
              <TableRow>
                <TableCell className="text-sm font-bold" style={{ textAlign: "start" }}>
                  #
                </TableCell>
                <TableCell className="text-sm font-bold">S No.</TableCell>
                {fieldConfigs.map((field) => (
                  <TableCell key={field.name} className="text-sm font-bold">
                    {field.label}
                  </TableCell>
                ))}
                <TableCell className="text-sm font-bold text-center ml-4" style={{ textAlign: "center" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell style={{ textAlign: "start" }}>
                    <FormControlLabel
                      control={<Checkbox sx={{ "&.Mui-checked": { color: primaryColor } }} />}
                    />
                  </TableCell>
                  <TableCell>{rowIndex + 1}</TableCell>
                  
                  {fieldConfigs.map((field) => (
                    <TableCell key={field.name} className="">
                      {field.name === "department" ? (
                        <div style={{ display: "block", width: "fit-content" }}>
                          <SapDropDown
                            name={field.name}
                            value={row[field.name]}
                            options={["Sales", "Engineering", "HR", "Marketing"]}
                            onChange={(e) => handleInputChange(rowIndex, e)}
                            style={{ minWidth: "200px", fontSize: "12px" }}
                          />
                        </div>
                      ) : field.name === "departmentA" ? (
                        <div style={{ display: "block", width: "fit-content" }}>
                          <SapDropDown
                            name={field.name}
                            value={row[field.name]}
                            options={["Alice Smith", "Bob Johnson", "Charlie Brown", "David Wilson"]}
                            onChange={(e) => handleInputChange(rowIndex, e)}
                            style={{ minWidth: "200px", fontSize: "12px" }}
                          />
                        </div>
                      ) : field.name === "description" || field.name === "groupName" ? (
                        <div style={{ display: "block", width: "fit-content" }}>
                          <TextField
                            name={field.name}
                            value={row[field.name]}
                            disabled={!isEditable} // Disable if not editable
                            onChange={(e) => handleInputChange(rowIndex, e)}
                            size="small"
                            inputProps={{ style: { fontSize: "12px", minWidth: "320px", height: "10px" } }}
                          />
                        </div>
                      ) : field.name === "requiredDate" || field.name === "quotedDate" ? (
                        <SapDateField
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              inputProps={{ style: { fontSize: "12px" } }}
                              disabled={!isEditable} // Disable if not editable
                            />
                          )}
                        />
                      ) : (
                        <TextField
                          name={field.name}
                          value={row[field.name]}
                          disabled={!isEditable} // Disable if not editable
                          onChange={(e) => handleInputChange(rowIndex, e)}
                          size="small"
                          inputProps={{ style: { fontSize: "12px", minWidth: "60px", height: "10px" } }}
                        />
                      )}
                    </TableCell>
                  ))}
                  
                  <TableCell className="flex justify-center">
                    <Button
                      onClick={() => handleDeleteRow(rowIndex)}
                      sx={{
                        transition: "background-color 0.3s, color 0.3s",
                        color: `${primaryColor}`,
                        fontSize: "16px",
                        "&:hover": { color: "red" },
                      }}
                    >
                      <RiDeleteBin6Line size={30} className="mt-1 border-2 border-sky-600 p-1 rounded-full" />
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
  
  export default CxUserGroup;
  
  