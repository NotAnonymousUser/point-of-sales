import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";

const CxAttachment = ({
  rowsA = [],
  handleInputChangeA,
  handleDeleteRowA,
  handleAddRowA,
  primaryColor,
  tabValue,
  fieldConfigsA,
}) => {
  const [fileData, setFileData] = useState([]);

  useEffect(() => {
    setFileData(rowsA.map(() => ({ filePath: "", fileName: "", attachmentDate: "" })));
  }, [rowsA]);

  const handleFileUpload = (event, rowIndex) => {
    const file = event.target.files[0];
    if (file) {
      const simulatedPath = `C:\\Users\\YourUser\\Documents\\${file.name}`;
      const currentDate = new Date();
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;

      const updatedFileData = [...fileData];
      updatedFileData[rowIndex] = {
        filePath: simulatedPath,
        fileName: file.name,
        attachmentDate: formattedDate,
      };
      setFileData(updatedFileData);

      handleInputChangeA(rowIndex, { target: { name: "targetPath", value: simulatedPath } });
      handleInputChangeA(rowIndex, { target: { name: "fileName", value: file.name } });
      handleInputChangeA(rowIndex, { target: { name: "attachmentDate", value: formattedDate } });
    }
  };

  return (
    <div className="table-container" style={{ overflowX: "auto", width: "auto", padding:"20px" }}>
      <Table component={Paper} className="shadow-sm shadow-slate-800 ">
        <TableHead>
          <TableRow>
            <TableCell className="text-sm font-bold">S No.</TableCell>
            {fieldConfigsA.map((field) => (
              <TableCell key={field.name} className="text-sm font-bold">
                {field.label}
              </TableCell>
            ))}
            <TableCell className="text-sm font-bold text-center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsA.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{rowIndex + 1}</TableCell>
              {fieldConfigsA.map((field) => (
                <TableCell key={field.name}>
                  {field.name === "targetPath" ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => document.getElementById(`fileInput-${rowIndex}`).click()}
                        sx={{
                          color: `${primaryColor}`,
                          fontSize: "12px",
                          width: "150px",
                          height: "36px",
                          backgroundColor: row[field.name] ? "lightgray" : "transparent",
                          '&:hover': {
                            backgroundColor: fileData[rowIndex]?.filePath ? "lightgray" : "lightblue",
                          },
                        }}
                      >
                        Choose file
                      </Button>
                      
                      <input
                        type="file"
                        id={`fileInput-${rowIndex}`}
                        onChange={(e) => handleFileUpload(e, rowIndex)}
                        style={{ display: "none" }}
                      />
                    </>
                  ) : (
                    <TextField
                      name={field.name}
                      value={field.name === "targetPath" ? fileData[rowIndex]?.filePath : row[field.name]}
                      onChange={(e) => handleInputChangeA(rowIndex, e)}
                      size="small"
                      inputProps={{ style: { fontSize: "12px" } }}
                    />
                  )}
                </TableCell>
              ))}
              <TableCell>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Button
                    onClick={() => handleAddRowA(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                      marginRight: "5px",
                    }}
                  >
                    <IoMdAdd size={30} className="border-2 border-sky-600 p-1 rounded-full" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteRowA(rowIndex)}
                    sx={{
                      transition: "background-color 0.3s, color 0.3s",
                      color: `${primaryColor}`,
                      fontSize: "16px",
                      "&:hover": { color: "red" },
                    }}
                  >
                    <RiDeleteBin6Line size={30} className="border-2 border-sky-600 p-1 rounded-full" />
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CxAttachment;
