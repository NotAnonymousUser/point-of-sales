"use client";

import Link from "next/link";
import { RiEdit2Fill, RiDeleteBin2Fill, RiDeleteBin6Line } from "react-icons/ri";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useColor } from "@/app/context/ColorContext";
import Layout from "@/app/components/Layout/Layout";
import CustomButton from "@/app/components/buttons/customButton/customButton";
import Pagination from "@/app/components/pagination/Pagination";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 18,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TABLE_HEADERS = [
  { id: "User ID", width: "20%" },
  { id: "User Name", width: "20%" },
  { id: "Action", width: "20%" },
];

const ALL_USERS = [
  { id: "U-001", name: "Alice Smith" },
  { id: "U-002", name: "Bob Johnson" },
  { id: "U-003", name: "Charlie Brown" },
  { id: "U-004", name: "David Wilson" },
  { id: "U-005", name: "Eva Green" },
  { id: "U-006", name: "Frank Wright" },
  { id: "U-007", name: "James Johns" },
  { id: "U-008", name: "Alisa Khan" },
  { id: "U-009", name: "Chennal Disuza" },
  { id: "U-010", name: "Jesse Pinkman" },
];

const ROWS_PER_PAGE = 5;

const UserPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { secondaryColor } = useColor();
  const [users, setUsers] = useState(ALL_USERS);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const filteredUsers = users.filter((user) =>
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleDelete = () => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userToDelete.id));
    closeDeleteDialog();
  };

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <Paper
          elevation={3}
          className="w-full h-full p-5 border rounded-lg"
          style={{ backgroundColor: "white", borderColor: "#d0d0d0" }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black ml-4">Manage Users</h2>
            <Link href="/create-users">
              <CustomButton
                title="Create User"
                primaryEnabled={true}
                icon={true}
                classes="mr-6 mt-5 ml-4 whitespace-nowrap p-2 rounded-md flex items-center w-auto font-bold mb-6"
              />
            </Link>
          </div>
          <hr className="border-gray-700 w-full" />

          <div className="w-full flex justify-center mt-8">
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{
                maxWidth: "1200px",
                backgroundColor: secondaryColor,
                color: "black",
              }}
            />
          </div>

          <div className="w-full flex justify-center">
            <TableContainer
              component={Paper}
              className="mt-8"
              sx={{ maxWidth: 1200 }}
            >
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {TABLE_HEADERS.map(({ id, width }) => (
                      <StyledTableCell
                        key={id}
                        className="font-bold"
                        sx={{ width }}
                      >
                        {id}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedUsers.map((user) => (
                    <StyledTableRow key={user.id}>
                      <StyledTableCell component="th" scope="row">
                        {user.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {user.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
  <div className="flex space-x-4">
    <Link href={`/edit-user`}>
      <RiEdit2Fill
        size={36}
        className="border-2 border-blue-600 p-2 rounded-full cursor-pointer   hover:text-blue-600 transition-colors"
      />
    </Link>
    <RiDeleteBin6Line
      size={36}
      className="border-2 border-blue-600 p-2 rounded-full cursor-pointer   hover:text-red-600 transition-colors"
      onClick={() => openDeleteDialog(user)}
    />
  </div>
</StyledTableCell>

                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <div className="mr-28">
            <div className="w-full flex justify-end mt-8">
              <Pagination
                count={Math.ceil(filteredUsers.length / ROWS_PER_PAGE)}
                page={page}
                onPageChange={(event, value) => setPage(value)}
              />
            </div>
          </div>
        </Paper>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={closeDeleteDialog}
          aria-labelledby="delete-dialog-title"
        >
          <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="error" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </Layout>
  );
};

export default UserPage;
