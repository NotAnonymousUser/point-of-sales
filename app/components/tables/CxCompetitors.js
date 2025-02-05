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
      {value === index && <Box p={0}>{children}</Box>} {/* Removed extra padding */}
    </div>
  );
}

const CxCompetitors = ({
  tabValue,
  rowsC,
  primaryColor,
  handleInputChangeC,
  handleDeleteRowC,
  handleAddRowC,
  fieldConfigsC,
  secondaryColor,
}) => {
  return (
    <TabPanel
      value={tabValue}
      index={4}
      style={{ padding: "20px", overflowY: "auto" }}
    >
      <div
        className="table-container"
        style={{
          overflowX: "auto",  // Enables horizontal scrolling only within the table container

        }}
      >
        <Table
          component={Paper}
          className="shadow-sm shadow-slate-800 px-12"
          style={{ marginBottom: "0px", marginTop: "0px" }}  
        >
          <TableHead>
            <TableRow>
              <TableCell className="text-sm font-bold">S No.</TableCell>
              {fieldConfigsC.map((field) => (
                <TableCell key={field.name} className="text-sm font-bold">
                  {field.label}
                </TableCell>
              ))}
              <TableCell className="text-sm font-bold text-center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsC.map((rowC, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {fieldConfigsC.map((field) => (
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
                    ) : field.name === "won" ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "4px",
                        }}
                      >
                        <input
                          type="checkbox"
                          style={{
                            marginRight: "8px",
                            height: "40px",
                            width: "20px",
                          }}
                        />
                        <label
                          style={{
                            fontWeight: "bold",
                            fontSize: "12px",
                          }}
                        ></label>
                      </div>
                    ) : (
                      <TextField
                        name={field.name}
                        value={rowC[field.name]}
                        onChange={(e) => handleInputChangeC(rowIndex, e)}
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
                    onClick={() => handleAddRowC(rowIndex)}
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
                    onClick={() => handleDeleteRowC(rowIndex)}
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

export default CxCompetitors;
