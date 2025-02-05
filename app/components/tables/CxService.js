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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import SapDateField from "../fields/date/sapDateField";
import CustomButton from "../buttons/customButton/customButton";
import CxActions from "../buttons/CxAction/CxAction";

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

const CxService = ({
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
          overflowX: "auto",  // Enables horizontal scrolling only within the table container

        }}
      >

        <Table component={Paper} className="shadow-sm shadow-slate-800 px-12"
        style={{ marginBottom:"10px" , marginTop: "8px",}}
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
                        value={row[field.name]}
                        onChange={(e) => handleInputChange(rowIndex, e)}
                        size="small"
                        inputProps={{ style: { fontSize: "12px" , minWidth: "60px" , height: "10px"} }}
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
        
      </div><div style={{ marginTop: "20px", marginRight: "20px" }}>
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
                  <CustomButton
                    primaryEnabled={true}
                    title="You Can Also"
                    padding="8px"
                    fontsize="12px"
                  />
                </div>
              </div>
            </div>
    </TabPanel>
  );
};

export default CxService;
