import React from 'react';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import { Close, Print } from '@mui/icons-material';

const InvoicePopup = ({ open, onClose, purchase }) => {
  const handlePrint = () => {
    const printContent = document.getElementById('invoice-content');
    if (!printContent) return;

    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    const printDocument = printWindow.document;

    // Add necessary styles
    printDocument.write(`
      <html>
        <head>
          <title>Print Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .print-content { padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 8px; text-align: left; }
            th { background-color: #f3f4f6; }
            .text-right { text-align: right; }
            .border-t { border-top: 1px solid #e5e7eb; }
            .mt-4 { margin-top: 1rem; }
            .mb-4 { margin-bottom: 1rem; }
            .font-bold { font-weight: bold; }
            @media print {
              body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
            }
          </style>
        </head>
        <body>
          <div class="print-content">
            ${printContent.innerHTML}
          </div>
        </body>
      </html>
    `);

    printDocument.close();
    printWindow.focus();
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };

  if (!purchase) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogContent>
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
          <div className="flex gap-2">
            <IconButton onClick={handlePrint} color="primary">
              <Print />
            </IconButton>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        </div>

        <div id="invoice-content" className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              {/* Replace with your actual logo */}
              <div className="w-16 h-16 bg-[#006400] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                POS
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Your Company Name</h1>
                <p className="text-gray-600">123 Business Street</p>
                <p className="text-gray-600">City, Country</p>
                <p className="text-gray-600">Phone: +1234567890</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-gray-800">Invoice #{purchase.docNumber}</h2>
              <p className="text-gray-600">Date: {purchase.date}</p>
              <p className="text-gray-600">Time: {purchase.time}</p>
            </div>
          </div>

          {/* Customer Details */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Customer Details</h3>
            <p className="text-gray-700">Name: {purchase.customerName}</p>
            <p className="text-gray-700">Phone: {purchase.customerPhone}</p>
          </div>

          {/* Items Table */}
          <table className="min-w-full mb-8">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-bold text-gray-800">Item</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-800">Qty</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-800">Price</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-800">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {purchase.items.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">{item.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">PKR {parseFloat(item.price).toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 text-right">PKR {(item.quantity * parseFloat(item.price)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-800 font-medium">PKR {parseFloat(purchase.totalPrice).toFixed(2)}</span>
                </div>
                {purchase.discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-gray-800 font-medium">PKR {parseFloat(purchase.discount).toFixed(2)}</span>
                  </div>
                )}
                {purchase.tax > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Tax:</span>
                    <span className="text-gray-800 font-medium">PKR {parseFloat(purchase.tax).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
                  <span className="text-gray-800 font-bold">Total:</span>
                  <span className="text-gray-800 font-bold">PKR {parseFloat(purchase.totalPrice).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-600 border-t border-gray-200 pt-4">
            <p>Thank you for your business!</p>
            <p className="text-sm mt-2">For any queries, please contact us at support@yourcompany.com</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InvoicePopup; 