import React from "react";
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, } from "@mui/material";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";

const CxPotential = ({ rowsO, handleInputChangeO, handleAddRowO, handleDeleteRowO, secondaryColor, primaryColor }) => {
  return (
    <div className="table-container">
      <Table className="shadow-sm shadow-slate-800 px-12">
        <div className="flex">
          {/* Left side for fields */}
          <div className="w-1/2 pr-4">
            <Paper
              elevation={3}
              style={{
                backgroundColor: "white",
                padding: "20px",
                width: "100%",
                height: "auto",
                marginTop: "4px",
                marginBottom: "4px",
              }}
            >
              {/* Bottom sections */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left column */}
                <div style={{ width: "30%" }}>
                  <div className="space-y-2" style={{ width: "390px" }}>
                    {/* Predicted Closing In */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Predicted Closing In
                      </label>
                      <input
                        type="number"
                        style={{
                          width: "80px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                      <select
                        style={{
                          marginLeft: "4px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      >
                        <option>Days</option>
                      </select>
                    </div>

                    {/* Predicted Closing Date */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Predicted Closing Date
                      </label>
                      <input
                        type="date"
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Potential Amount */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Potential Amount
                      </label>
                      <input
                        type="number"
                        defaultValue="0.00"
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Weighted Amount */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Weighted Amount
                      </label>
                      <input
                        type="number"
                        defaultValue="0.00"
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Gross Profit % */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Gross Profit %
                      </label>
                      <input
                        type="number"
                        defaultValue="0.00"
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Gross Profit Total */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Gross Profit Total
                      </label>
                      <input
                        type="number"
                        defaultValue="0.00"
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      />
                    </div>

                    {/* Level of Interest */}
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
                      <label style={{ flex: 1, fontWeight: "bold", fontSize: "12px" }}>
                        Level of Interest
                      </label>
                      <select
                        style={{
                          width: "230px",
                          padding: "2px",
                          fontSize: "12px",
                          borderRadius: "4px",
                          border: "2px solid #ccc",
                        }}
                      >
                        <option>Select Level</option>
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
            {/* Additional fields can be added similarly */}
          </div>

          {/* Right side for the table */}
          <div className="w-full mt-4 mr-4">
            <h1>Interest Range:</h1>

            <Table component={Paper} className="shadow-sm shadow-black">
              <TableHead>
                <TableRow>
                  <TableCell className="text-sm font-bold">S No.</TableCell>
                  <TableCell className="text-sm font-bold">Description</TableCell>
                  <TableCell className="text-sm font-bold">Primary</TableCell>
                  <TableCell className="text-sm font-bold text-center ml-4">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rowsO.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.itemNo}</TableCell>
                    <TableCell>
                      <TextField
                        name="description"
                        value={row.targetpath}
                        onChange={(e) => handleInputChangeO(index, e)}
                        size="small"
                        inputProps={{
                          style: {
                            fontSize: "12px",
                            width: "640px",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell>
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
                            height: "20px",
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
                    </TableCell>
                    <TableCell className="flex">
                                  <Button
                                    onClick={() => handleAddRowO(index)}
                                    sx={{
                                      transition:
                                        "background-color 0.3s, color 0.3s",
                                      color: `${primaryColor}`,
                                      fontSize: "16px",
                                    }}
                                  >
                                    <IoMdAdd
                                      size={30}
                                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                      onClick={handleAddRowO}
                                    />
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteRowO(index)}
                                    sx={{
                                      transition:
                                        "background-color 0.3s, color 0.3s",
                                      color: `${primaryColor}`,
                                      fontSize: "16px",
                                      "&:hover": {
                                        color: "red",
                                      },
                                    }}
                                  >
                                    <RiDeleteBin6Line
                                      size={30}
                                      className="mt-1 border-2 border-sky-600 p-1 rounded-full"
                                      sx={{
                                        fontSize: "16px",
                                        color: `inherit`,
                                      }}
                                    />
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

export default CxPotential;
