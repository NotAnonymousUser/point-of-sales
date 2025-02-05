import { Modal, Tabs } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import CxActivities from "../tables/CxActivities"; // Adjust the path as necessary
import { font } from "../font/poppins";
import {
  Box,
  Paper,
  Tab,
  Tabs as MuiTabs,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  styled,
  TableBody,
  Checkbox,
} from "@mui/material"; // Import Tabs from MUI
import SapTextField from "../fields/sapFields/sapTextField";
import { useColor } from "@/app/context/ColorContext";
import CxCheck from "../tables/CxCheck";
import CustomButton from "../buttons/customButton/customButton";
import LogisticTab from "../tables/CxLogistic";
import { IoCloseSharp } from "react-icons/io5";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Layout from "@/app/components/Layout/Layout";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
    backgroundColor: theme.palette.common.white, // Set body cells to white
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white, // Set entire row background to white
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

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

const PopupUser = ({ isOpen, onClose }) => {
  const emailInputRef = useRef(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const { secondaryColor, primaryColor } = useColor();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      emailInputRef.current instanceof HTMLInputElement
    ) {
      // Safe to use HTMLInputElement properties here
      emailInputRef.current.focus(); // Example: Focus the input on mount
    }
  }, []);
  const ALL_USERS = [
    { id: "U-001", name: "Alice Smith" },
    { id: "U-002", name: "Bob Johnson" },
    { id: "U-003", name: "Charlie Brown" },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const ROWS_PER_PAGE = 3;

  const filteredUsers = ALL_USERS.filter((user) =>
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const handleMaximize = () => {
    setIsMaximized((prev) => !prev);
    if (isMinimized) setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized((prev) => !prev);
    if (isMaximized) setIsMaximized(false);
  };

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleCheckboxChange = (userId) => {
    setSelectedUsers((prevSelectedUsers) => ({
      ...prevSelectedUsers,
      [userId]: !prevSelectedUsers[userId], // Toggle the checked status
    }));
  };

  const [rows, setRows] = useState([
    {
      item: "",
      itemDescription: "",
      quantity: "",
      requiredDate: null,
      quotedDate: null,
      g_LAccount: "",
      g_LAccountName: "",
      taxCode: "",
      total: "",
    },
  ]);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        item: "",
        itemDescription: "",
        quantity: 0,
        requiredDate: null,
        quotedDate: null,
        g_LAccount: "",
        g_LAccountName: "",
        taxCode: "",
        total: 0,
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };
  const TABLE_HEADERS = [
    { id: "User ID", width: "20%" },
    { id: "User Name", width: "20%" },
  ];

  const fieldConfigs = [
    { name: "requiredDate", label: "User Id" },
    { name: "amount", label: "Amount" },
    { name: "bankName", label: "Bank Name" },
    { name: "Branch", label: "Branch" },
    { name: "account", label: "Account" },
    { name: "checkNo", label: "Check No." },
  ];
  const fields = [
    {
      section: "left",
      type: "textfield",
      label: "G/L Account",
      showUploadButton: false,
      name: "shipTo",
    },
    {
      section: "left",
      type: "date",
      label: "Transfer Date",
      showUploadButton: false,
      name: "billTo",
    },
    {
      section: "left",
      type: "textfield",
      label: "Rerference",
      showUploadButton: false,
      name: "shipTo",
    },
    {
      type: "textfield",
      label: "Total",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
  ];
  const [selectedUsers, setSelectedUsers] = useState({});
  const fieldsC = [
    {
      section: "left",
      type: "textfield",
      label: "G/L Account",
      showUploadButton: false,
      name: "shipTo",
    },
    {
      type: "textfield",
      label: "Total",
      customWidth: "80%",
      showUploadButton: false,
      section: "right",
    },
  ];

  return (
    <>
      {isMinimized ? (
        <div
          className="fixed bottom-4 left-1/2 cursor-pointer transform -translate-x-1/2"
          onClick={() => setIsMinimized(false)}
          aria-label="Restore Popup"
        >
          <div
            className="flex justify-end"
            style={{
              border: "2px solid black", // Outer border for buttons to look like one unit
              borderRadius: "20px", // Matches with overall border-radius
              padding: "4px", // Padding to merge buttons into the same block
              backgroundColor: "#F0F1F3", // Background color to separate buttons from the blue background
              width: "fit-content", // Change to fit the content size
              marginLeft: "auto", // This pushes the div to the right within its parent
            }}
          >
            {/* Minimize Button */}
            <button
              onClick={handleMaximize}
              className="bg-gray-500 text-white w-5 h-5 flex justify-center items-center hover:bg-gray-400"
              aria-label="Minimize"
              style={{
                borderRadius: "50%",
                marginRight: "2px", // Slight spacing between the two buttons
                border: "2px solid black", // Inner border for individual button
                padding: "0", // Remove default padding for smaller size
                lineHeight: "1", // Adjust line height to reduce height
              }}
            >
              {"-"} {/* Minimize Symbol */}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="bg-red-500 text-white w-5 h-5 flex justify-center items-center hover:bg-red-400"
              aria-label="Close"
              style={{
                borderRadius: "50%",
                border: "2px solid black", // Inner border for individual button
                padding: "0", // Remove default padding for smaller size
                lineHeight: "1", // Adjust line height to reduce height
              }}
            >
              <IoCloseSharp />
              {/* Close Symbol */}
            </button>
          </div>

          <div
            style={{
              backgroundColor: primaryColor, // Adjust to the blue color in your image
              borderRadius: "10px",
              padding: "4px 8px", // Reduced padding for smaller size
              display: "flex",
              alignItems: "center",
              border: "2px solid #000", // Black border as in the image
            }}
          >
            {/* Payment Means Button Text */}
            <span className="text-white text-sm font-bold">User List</span>
          </div>
        </div>
      ) : (
        <Modal
          style={{ overflowY: "auto", maxHeight: "100vh" }}
          show={isOpen}
          popup
          size={isMaximized ? "5xl" : "md"}
          onClose={onClose}
          initialFocus={emailInputRef}
          className={`transition-transform duration-300 ${
            isMaximized ? "transform scale-100" : "transform scale-75"
          }`}
        >
          <div className="relative">
            {/* Header with Control Buttons */}
            <div
              className="flex justify-between items-center p-2 bg-gray-100 border-b"
              style={{
                border: "2px solid #d0d0d0",
                borderRadius: "8px",
              }}
            >
              <h2 className="text-lg font-semibold">User List</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleMinimize}
                  className="bg-gray-400 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-gray-200"
                  style={{
                    borderRadius: "50%",
                    marginRight: "2px", // Slight spacing between the two buttons
                    border: "2px solid black", // Inner border for individual button
                    padding: "0", // Remove default padding for smaller size
                    lineHeight: "1", // Adjust line height to reduce height
                  }}
                  aria-label="Minimize"
                >
                  {"_"} {/* Minimize Symbol */}
                </button>
                <button
                  onClick={handleMaximize}
                  className="bg-blue-500 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-blue-600"
                  style={{
                    borderRadius: "50%",
                    marginRight: "2px", // Slight spacing between the two buttons
                    border: "2px solid black", // Inner border for individual button
                    padding: "0", // Remove default padding for smaller size
                    lineHeight: "1", // Adjust line height to reduce height
                  }}
                  aria-label={isMaximized ? "Restore" : "Maximize"}
                >
                  {isMaximized ? (
                    <FiZoomOut size={"20"} />
                  ) : (
                    <FiZoomIn size={"25"} />
                  )}{" "}
                  {/* Maximize / Restore Symbol */}
                </button>
                <button
                  onClick={onClose}
                  className="bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center hover:bg-red-400"
                  style={{
                    borderRadius: "50%",
                    border: "2px solid black", // Inner border for individual button
                    padding: "0", // Remove default padding for smaller size
                    lineHeight: "1", // Adjust line height to reduce height
                  }}
                  aria-label="Close"
                >
                  <IoCloseSharp size={"20"} /> {/* Close Symbol */}
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <Modal.Body
              style={{
                border: "4px solid #d0d0d0",
                borderRadius: "8px",
              }}
            >
              <main>
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
                    <p className="text-xl font-bold text-black mt-3 ml-2">
                      Select User
                    </p>
                    <hr className="border-t-2 border-gray-700 mt-5" />
                  </Paper>

                  {/* Tabs Section */}
                  <Paper
                    elevation={3}
                    style={{
                      backgroundColor: secondaryColor,
                      border: "1px solid #d0d0d0",
                      borderRadius: "8px",
                      overflowX: "auto",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {/* Tab Panels */}
                    <div className="w-full flex justify-center">
                      <TableContainer component={Paper}>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <StyledTableCell padding="checkbox">
                                Select
                              </StyledTableCell>
                              <StyledTableCell>S.No</StyledTableCell>
                              <StyledTableCell>User ID</StyledTableCell>
                              <StyledTableCell>User Name</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {paginatedUsers.map((user, index) => (
                              <StyledTableRow key={user.id}>
                                <StyledTableCell padding="checkbox">
                                  <Checkbox
                                    checked={!!selectedUsers[user.id]} // Use double-negation to ensure boolean
                                    onChange={() =>
                                      handleCheckboxChange(user.id)
                                    }
                                  />
                                </StyledTableCell>
                                <StyledTableCell>
                                  {(page - 1) * ROWS_PER_PAGE + index + 1}
                                </StyledTableCell>
                                <StyledTableCell>{user.id}</StyledTableCell>
                                <StyledTableCell>{user.name}</StyledTableCell>
                              </StyledTableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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
                   

                      {/* Right column */}

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
                          style={{
                            display: "flex",
                            gap: "8px",
                            marginLeft: "10px",
                          }}
                        >
                          <CustomButton
                            title="Select"
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
            </Modal.Body>
          </div>
        </Modal>
      )}
    </>
  );
};

export default PopupUser;
