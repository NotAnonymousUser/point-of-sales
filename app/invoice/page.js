'use client';

import React from "react";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "@/app/components/Layout/Layout";
import Link from "next/link";

const InvoicePage = () => {
  const handlePrint = () => {
    // Capture the content of the print section
    const printContents = document.querySelector('.print-section').innerHTML;
    const originalContents = document.body.innerHTML;

    // Replace body content with only the print section
    document.body.innerHTML = printContents;

    // Trigger the print window
    window.print();

    // Restore original body content
    document.body.innerHTML = originalContents;
  };

  return (
    <Layout>
      {/* Header */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold text-black text-center">Invoice Details</p>
        </div>
        <hr className="border-gray-700 w-full mt-4" />

        {/* Invoice Section (this part will be printed) */}
        <div className="print-section bg-white p-6 pb-8 pt-1 rounded-xl mt-2 min-h-52">
          {/* Company Logo and Details */}
          <div className="mb-4 flex justify-between items-center">
          <img src="/full-logo.png" alt="Company Logo" className="w-80 h-16" />
          </div>
            <div>
              <h1 className="text-2xl font-bold">Nizamuddin Faridulhaq</h1>
              <p>Branch Office: F-7, Grace Center, Khayaban-e-Hafiz, DHA Phase V, Gizri Near PNS Haider, Karachi, Pakistan</p>
              <p>Email: NF@company.com | Phone: (+92-21) 35866198 – 35864261</p>
            </div>
          
          {/* Invoice Details */}
          <div className="mb-6 flex space-x-6">
  {/* Invoice Details Section */}
  <div className="w-1/3">
    <h2 className="text-xl font-semibold">Invoice Details:</h2>
    <p>Invoice No.: <strong>22123101</strong></p>
    <p>Order Date: <strong>2022-11-26</strong></p>
    <p>Delivery Date: <strong>2022-12-01</strong></p>
    <p>Total Amount: <strong>$282.00</strong></p>
    <p>Payment Type: <strong>Cash on Delivery</strong></p>
    <p>Payment Status: <strong>Paid</strong></p>
  </div>

  {/* Customer Details Section */}
  <div className="w-1/3">
    <h2 className="text-xl font-semibold">Customer Details:</h2>
    <p>Name: <strong>John Doe</strong></p>
    <p>Email: <strong>johndoe@email.com</strong></p>
    <p>Phone: <strong>+123 456 7890</strong></p>
  </div>

  {/* Address Details Section */}
  <div className="w-1/3">
    <h2 className="text-xl font-semibold">Address:</h2>
    <p>Street: <strong>123 Main Street</strong></p>
    <p>City: <strong>City Name</strong></p>
    <p>Country: <strong>Country</strong></p>
  </div>
</div>

          

          {/* Table */}
          <table className="w-full border-collapse border border-gray-300 text-left mb-6">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 p-2">No.</th>
                <th className="border border-gray-400 p-2">Products</th>
                <th className="border border-gray-400 p-2">Qty.</th>
                <th className="border border-gray-400 p-2">Price</th>
                <th className="border border-gray-400 p-2">Discount</th>
                <th className="border border-gray-400 p-2">Tax</th>
                <th className="border border-gray-400 p-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">01</td>
                <td className="border p-2">Sunnoti kamij with pagri and rumal</td>
                <td className="border p-2">01</td>
                <td className="border p-2">$99</td>
                <td className="border p-2">$09</td>
                <td className="border p-2">$00</td>
                <td className="border p-2">$108</td>
              </tr>
              <tr>
                <td className="border p-2">02</td>
                <td className="border p-2">Sendel with pagri and rumal</td>
                <td className="border p-2">02</td>
                <td className="border p-2">$150</td>
                <td className="border p-2">$10</td>
                <td className="border p-2">$00</td>
                <td className="border p-2">$160</td>
              </tr>
              <tr>
                <td className="border p-2">03</td>
                <td className="border p-2">Smartphone with headphone</td>
                <td className="border p-2">03</td>
                <td className="border p-2">$03</td>
                <td className="border p-2">$03</td>
                <td className="border p-2">$00</td>
                <td className="border p-2">$06</td>
              </tr>
              <tr>
                <td className="border p-2">04</td>
                <td className="border p-2">Shaikh Abu Bakkar with his mind</td>
                <td className="border p-2">04</td>
                <td className="border p-2">$04</td>
                <td className="border p-2">$04</td>
                <td className="border p-2">$00</td>
                <td className="border p-2">$08</td>
              </tr>
            </tbody>
          </table>

          <div className="mb-2 mt-2">
  <table className="w-full border-collapse border border-gray-300 text-left">
    <tbody>
      <tr>
        <td className="border border-gray-400 p-2">Discount:</td>
        <td className="border border-gray-400 p-2">PKR 00.00</td>
      </tr>
      <tr>
        <td className="border border-gray-400 p-2">Tax:</td>
        <td className="border border-gray-400 p-2">PKR 00.00</td>
      </tr>
      <tr>
        <td className="border border-gray-400 p-2 font-semibold">Total:</td>
        <td className="border border-gray-400 p-2 font-semibold">$282.00</td>
      </tr>
    </tbody>
  </table>
</div>
        </div>

        {/* Print Button (this will not appear in the print version) */}
        <div className="text-right mt-4">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Print Invoice
          </button>
        </div>
      </main>

      {/* Add a media query in your global CSS to hide the print button when printing */}
      <style jsx global>{`
        @media print {
          /* Hide elements you don't want to print */
          .print-section {
            display: block;
          }
          button {
            display: none;
          }
          body {
            margin: 0;
            padding: 20px;
            background-color: white;
          }
        }
      `}</style>
    </Layout>
  );
};

export default InvoicePage;
