"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Button } from "@mui/material";
import "./styles.css";
import dynamic from 'next/dynamic';

// Dynamic import with no SSR
const DateTimeDisplay = dynamic(
  () => import('../components/DateTimeDisplay'),
  { ssr: false }
);

const LeftSection = ({
  cart,
  decreaseQuantity,
  increaseQuantity,
  discount,
  paymentDetails,
  calculateTotalWithDiscount,
  setShowCancelPopup,
  setShowSuspendPopup,
  showCancelPopup,
  showSuspendPopup,
  handleCancelReceipt,
  handleSuspend,
  suspendedOrders,
  resumeOrder,
  deleteOrder,
  tax,
  handlePaymentConfirmation,
}) => {
  const [currentTime, setCurrentTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set initial time only after mounting
    if (mounted) {
      setCurrentTime(new Date());
      
      // Update time every second
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mounted]);

  // Format dates only if component is mounted and currentTime exists
  const formattedDate = mounted && currentTime ? currentTime.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  const formattedTime = mounted && currentTime ? currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }) : '';

  // Don't render until after hydration
  if (!mounted) {
    return null;
  }

  return (
    <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-4 w-5/6">
      {/* Date Section */}
      <div className="flex justify-between items-center mb-4 px-2">
        <DateTimeDisplay />
      </div>

      <div className="table-container">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="sticky top-0 table-header z-10">
            <tr>
              <th className="border border-gray-300 p-2 text-center">Serial #</th>
              {/* <th className="border border-gray-300 p-2 text-center">Customer Name</th> */}
              <th className="border border-gray-300 p-2 text-center">Article ID</th>
              <th className="border border-gray-300 p-2 text-center">Article</th>
              <th className="border border-gray-300 p-2 text-center">UOM</th>
              {/* <th className="border border-gray-300 p-2 text-center">Warehouse</th> */}
              <th className="border border-gray-300 p-2 text-center">Quantity</th>
              <th className="border border-gray-300 p-2 text-center">Unit Price</th>
              <th className="border border-gray-300 p-2 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={item.id}>
                <td className="border border-gray-300 p-2 text-center text-sm">{index + 1}</td>
                {/* <td className="border border-gray-300 p-2 text-center text-sm">{item.customerName || '-'}</td> */}
                <td className="border border-gray-300 p-2 text-center text-sm">{item.id}</td>
                <td className="border border-gray-300 p-2 text-left text-sm">{item.name}</td>
                <td className="border border-gray-300 p-2 text-center text-sm">{item.uom || '-'}</td>
                {/* <td className="border border-gray-300 p-2 text-center text-sm">{item.warehouse || '-'}</td> */}
                <td className="border border-gray-300 p-2 text-center text-sm flex items-center justify-center gap-2">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                </td>
                <td className="border border-gray-300 p-2 text-right text-sm">
                  PKR {Number(item.price).toFixed(2)}
                </td>
                <td className="border border-gray-300 p-2 text-right text-sm">
                  PKR {(Number(item.price) * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}

            {Array.from({ length: Math.max(0, 4 - cart.length) }).map((_, index) => (
              <tr key={`empty-${index}`}>
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                {/* <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td> */}
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                {/* <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td> */}
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                <td className="border border-gray-300 p-2 text-center text-sm text-gray-400">-</td>
                <td className="border border-gray-300 p-2 text-right text-sm text-gray-400">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Discount Section */}
      <div className="flex flex-col gap-2 border-t border-gray-300 mt-4 pt-8">
        <div className="flex justify-between items-center">
          <span className="text-left font-bold">Discount (%):</span>
          <span className="text-right text-gray-800">{discount}%</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-left font-semibold text-gray-600">Discount Amount:</span>
            <span className="text-right text-gray-800">
              PKR {((cart.reduce(
                (sum, item) => sum + parseFloat(item.price) * item.quantity,
                0
              ) * parseFloat(discount)) / 100).toFixed(2)}
            </span>
          </div>
        )}
      </div>

      {/* Tax Section */}
      <div className="flex flex-col gap-2 border-t border-gray-300 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-left font-bold">Tax (%):</span>
          <span className="text-right text-gray-800">{tax}%</span>
        </div>
        {tax > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-left font-semibold text-gray-600">Tax Amount:</span>
            <span className="text-right text-gray-800">
              PKR {(() => {
                const subtotal = cart.reduce(
                  (sum, item) => sum + parseFloat(item.price) * item.quantity,
                  0
                );
                const discountAmount = (subtotal * (parseFloat(discount) || 0)) / 100;
                const afterDiscount = parseFloat((subtotal - discountAmount).toFixed(2));
                const taxAmount = (afterDiscount * (parseFloat(tax) || 0)) / 100;
                return taxAmount.toFixed(2);
              })()}
            </span>
          </div>
        )}
      </div>

      {/* Payment Details Section */}
      {paymentDetails && (
        <div className="flex flex-col gap-2 border-t border-gray-300 mt-2 pt-2 md:pt-4">
          <div className="flex justify-between items-center">
            <span className="text-left font-semibold text-gray-600">Payment Method:</span>
            <span className="text-right text-gray-800">{paymentDetails.method}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-left font-semibold text-gray-600">Amount Paid:</span>
            <span className="text-right text-gray-800">PKR {paymentDetails.amount.toFixed(2)}</span>
          </div>
          {paymentDetails.method === 'Cash' && (
            <div className="flex justify-between items-center">
              <span className="text-left font-semibold text-gray-600">Change:</span>
              <span className="text-right text-gray-800">PKR {paymentDetails.change.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between items-center border-t border-gray-300 mt-4 pt-2">
        <span className="text-right font-bold">Total:</span>
        <span className="font-bold">
          PKR {cart.length > 0 ? calculateTotalWithDiscount() : "0.00"}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-between items-center mt-4">
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            color: "#006400",
            padding: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            border: "2px solid #006400",
            boxShadow: "none",
            textTransform: "none",
            flex: 1,
            "&:hover": {
              backgroundColor: "#006400",
              color: "white",
              border: "2px solid #006400",
            }
          }}
          onClick={handlePaymentConfirmation}
        >
          Confirm Payment
        </Button>

        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            color: "#FF0000",
            padding: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            border: "2px solid #FF0000",
            boxShadow: "none",
            textTransform: "none",
            flex: 1,
            "&:hover": {
              backgroundColor: "#FF0000",
              color: "white",
              border: "2px solid #FF0000",
            }
          }}
          onClick={() => setShowCancelPopup(true)}
        >
          Cancel Receipt
        </Button>

        <Button
          variant="outlined"
          sx={{
            backgroundColor: "white",
            color: "#FFA500",
            padding: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            border: "2px solid #FFA500",
            boxShadow: "none",
            textTransform: "none",
            flex: 1,
            "&:hover": {
              backgroundColor: "#FFA500",
              color: "white",
              border: "2px solid #FFA500",
            }
          }}
          onClick={() => setShowSuspendPopup(true)}
        >
          Suspend
        </Button>
      </div>

      {/* Suspended Orders Section */}
      <div className="container mx-3 p-2">
        <h2 className="text-xl font-bold mb-4">Suspended Orders</h2>
        <div className="table-container">
          {suspendedOrders.length > 0 ? (
            <table className="w-full border-collapse border border-gray-300">
              <thead className="sticky top-0 table-header z-10">
                <tr>
                  <th className="border border-gray-300 p-2 text-center">#</th>
                  <th className="border border-gray-300 p-2 text-center">Items</th>
                  <th className="border border-gray-300 p-2 text-center">Total (PKR)</th>
                  <th className="border border-gray-300 p-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suspendedOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border border-gray-300 p-2">
                      {order.items.length > 0 ? (
                        <>
                          {order.items[0].name} (x{order.items[0].quantity})
                          {order.items.length > 1 && <span>, ...</span>}
                        </>
                      ) : (
                        "No Items"
                      )}
                    </td>
                    <td className="border border-gray-300 p-2 text-right">
                      {order.total.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 p-2 flex justify-center items-center gap-2">
                      <button
                        onClick={() => resumeOrder(order)}
                        className="bg-blue-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Resume
                      </button>
                      <button
                        onClick={() => deleteOrder(order)}
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No suspended orders.</p>
          )}
        </div>
      </div>

      {/* Popups */}
      {showCancelPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg z-[1001] pointer-events-auto relative">
            <h2 className="text-lg font-bold mb-4">Confirm Cancellation</h2>
            <p>Are you sure you want to cancel this receipt?</p>
            <div className="flex gap-4 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleCancelReceipt();
                  setShowCancelPopup(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowCancelPopup(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      {showSuspendPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[1000]">
          <div className="bg-white p-6 rounded-lg shadow-lg z-[1001] pointer-events-auto relative">
            <h2 className="text-lg font-bold mb-4">Confirm Suspension</h2>
            <p>Are you sure you want to suspend this transaction?</p>
            <div className="flex gap-4 mt-4">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleSuspend();
                  setShowSuspendPopup(false);
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setShowSuspendPopup(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftSection; 