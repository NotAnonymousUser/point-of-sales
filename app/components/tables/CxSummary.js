'use client'

import React from "react";
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, TextField, Button } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import SapTextField from "../fields/sapFields/sapTextField";
import CxRadio from "../buttons/CxRadio/CxRadio";

const CxSummary = ({ rowsS, handleInputChangeS, handleAddRowS, handleDeleteRowS, secondaryColor, primaryColor }) => {
  
  const radioOptions = [
    { label: "Open", value: "open" },
    { label: "Won", value: "won" },
    { label: "Lost", value: "lost" },
  ];
  return (
    <div className="table-container">
      <Table className="shadow-sm shadow-slate-800 ">
        <div className="flex">
          {/* Left side for fields */}
          <div className="w-1/2 pr-4 ">
            <Paper
              elevation={3}
              style={{
                backgroundColor: "white",
                padding: "20px",
                width: "100%",
                height: "auto",
                marginTop: "0px",
                marginBottom: "0px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left column */}
                <div style={{ width: "30%" }}>
                  <div className="space-y-2" style={{ width: "390px" }}>
                    {/* Opportunity Status */}
                    <CxRadio fieldLabel="Opportunity Status:" options={radioOptions} />


                    {/* Document Fields */}
                    <SapTextField secondaryColor={secondaryColor} label="Document Type:" />
                    <SapTextField secondaryColor={secondaryColor} label="Document No:" />

                    <div style={{ display: "flex", alignItems: "center", padding: "4px" }}>
                      <input type="checkbox" style={{ marginRight: "8px" }} />
                      <label style={{ fontWeight: "bold", fontSize: "12px" }}>
                        Show Documents Related to the BP
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </div>

          {/* Right side for the table */}
          <div className="w-full mt-4 mr-4">
            <h1>Reasons:</h1>

            <Table component={Paper} className="shadow-sm shadow-black ">
              <TableHead>
                <TableRow>
                  <TableCell className="text-sm font-bold">S No.</TableCell>
                  <TableCell className="text-sm font-bold">Description</TableCell>
                  <TableCell className="text-sm font-bold text-center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsS.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.itemNo}</TableCell>
                    <TableCell>
                      <TextField
                        name="description"
                        value={row.targetpath}
                        onChange={(e) => handleInputChangeS(index, e)}
                        size="small"
                        inputProps={{
                          style: {
                            fontSize: "12px",
                            width: "640px",
                          },
                        }}
                      />
                    </TableCell>
                    <TableCell className="flex">
                      <Button
                        onClick={() => handleAddRowS(index)}
                        sx={{
                          transition: "background-color 0.3s, color 0.3s",
                          color: `${primaryColor}`,
                          fontSize: "16px",
                        }}
                      >
                        <IoMdAdd size={30} className="mt-1 border-2 border-sky-600 p-1 rounded-full" />
                      </Button>
                      <Button
                        onClick={() => handleDeleteRowS(index)}
                        sx={{
                          transition: "background-color 0.3s, color 0.3s",
                          color: `${primaryColor}`,
                          fontSize: "16px",
                          "&:hover": {
                            color: "red",
                          },
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
        </div>
      </Table>
    </div>
  );
};

export default CxSummary;
