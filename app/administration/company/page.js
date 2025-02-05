"use client";

import Link from 'next/link';
import { FaRegEye } from "react-icons/fa";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { useColor } from '@/app/context/ColorContext';
import Layout from '@/app/components/Layout/Layout';
import CustomButton from '@/app/components/buttons/customButton/customButton';
import Pagination from '@/app/components/pagination/Pagination';

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
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TABLE_HEADERS = [
  { id: 'Company ID', width: '20%' },
  { id: 'Company Name', width: '20%' },
  { id: 'Action', width: '20%' },
];

const allRows = [
  { id: 'CM-001', name: "Techno" },
  { id: 'CM-002', name: "Oppo" },
  { id: 'CM-003', name: "Infinix" },
  { id: 'CM-004', name: "TechCorp" },
  { id: 'CM-005', name: "AlphaTech" },
  { id: 'CM-006', name: "CyberNet" },
];

const rowsPerPage = 3;

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const { primaryColor, secondaryColor } = useColor();

  const handleSearch = (event) => setSearchQuery(event.target.value);

  const filteredRows = allRows.filter((row) =>
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const handlePageChange = (event, value) => setPage(value);

  return (
    <Layout>
      <main className="flex-1 p-3 bg-gray-100 flex justify-center items-center">
        <Paper
          elevation={3}
          className="w-full h-full p-5 border rounded-lg"
          style={{ backgroundColor: 'white', borderColor: '#d0d0d0' }}
        >
          {/* Manage Company Section */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-black ml-4">Manage Company</h2>
            <Link href="/create-company">
              <CustomButton
                title="Create Company"
                primaryEnabled={true}
                icon={true}
                classes="mr-6 mt-5 ml-4 whitespace-nowrap p-2 rounded-md flex items-center w-auto font-bold mb-6"
              />
            </Link>
          </div>
          <hr className="border-gray-700 w-full" />

          {/* Search Input */}
          <div className="w-full flex justify-center mt-8">
            <input
              type="text"
              placeholder="Search by User ID"
              value={searchQuery}
              onChange={handleSearch}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
              style={{
                maxWidth: '1200px',
                backgroundColor: secondaryColor,
                color: 'black',
              }}
            />
          </div>

          {/* Table */}
          <div className="w-full flex justify-center">
            <TableContainer component={Paper} className="mt-8" sx={{ maxWidth: 1200 }}>
              <Table sx={{ minWidth: 500 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {TABLE_HEADERS.map((header) => (
                      <StyledTableCell key={header.id} className="font-bold" sx={{ width: header.width }}>
                        {header.id}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.name}</StyledTableCell>
                      <StyledTableCell align="left">
                      <Link href={`/edit-company`}>
                          <div className="flex">
                            <FaRegEye
                              size={36}
                              className="border-2 border-blue-600 p-2 rounded-full"
                            />
                          </div>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          {/* Pagination */}
          <div className="mr-28">
            <div className="w-full flex justify-end mt-8">
              <Pagination
                count={Math.ceil(filteredRows.length / rowsPerPage)}
                page={page}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </Paper>
      </main>
    </Layout>
  );
};

export default Page;
