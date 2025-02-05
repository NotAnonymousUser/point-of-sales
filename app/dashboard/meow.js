"use client";

import React, { useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Box,
  TableFooter,
} from "@mui/material";
import { ArrowBack, Check } from "@mui/icons-material";
import { FiSearch } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout/Layout";

function POS() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("Sales Item");
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      id: 1,
      article: "000001",
      name: "FC Jupiter Stadium Jacket",
      unitPrice: 50,
    },
    {
      id: 2,
      article: "000002",
      name: "FC Jupiter Training Kit",
      unitPrice: 40,
    },
    { id: 3, article: "000003", name: "FC Jupiter Bank Kit", unitPrice: 30 },
    { id: 4, article: "000004", name: "FC Jupiter Cap", unitPrice: 20 },
  ];

  const filteredItems = items.filter(
(item) =>
  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  item.article.includes(searchQuery)
);

const addToCart = (item) => {
const existingItem = cart.find((cartItem) => cartItem.id === item.id);
if (existingItem) {
  setCart(
    cart.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    )
  );
} else {
  setCart([...cart, { ...item, quantity: 1 }]);
}
const updatedTotal = total + item.unitPrice;
setTotal(updatedTotal);
setTax(updatedTotal * 0.16);
setLoyaltyPoints(loyaltyPoints + Math.floor(item.unitPrice / 10));
};

  const calculateTotalWithDiscount = () => {
    const discountedTotal = total - (total * discount) / 100;
    return discountedTotal.toFixed(2);
  };


  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
  
      // Calculate new total
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      );
  
      setTotal(newTotal);
  
      return updatedCart;
    });
  };
  
  
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0); // Remove items with quantity <= 0
  
      // Update Total and Tax based on the new cart
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      );
      setTotal(newTotal);
  
      return updatedCart;
    });
  };
  

  // const handleCalculatorInput = (value) => {
  //   if (value === "clear") {
  //     setCalculatorInput("");
  //   } else if (value === "back") {
  //     setCalculatorInput(calculatorInput.slice(0, -1));
  //   } else {
  //     setCalculatorInput(calculatorInput + value);
  //   }
  // };

  const handleCalculatorInput = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
  };

  const handleCalculate = () => {
    try {
      // Evaluate the expression safely
      const result = eval(input); // Avoid using eval in production; use a library like math.js
      setInput(result.toString());
    } catch (error) {
      alert("Invalid expression");
    }
  };

  const applyDiscount = () => {
    setDiscount(parseFloat(input) || 0);
    setInput("");
  };
  const [customerInfo, setCustomerInfo] = useState({
    receiptId: "T231800010663",
    priceList: "Foods&Beverage Standard",
    name: "Karl Park",
    address: "Daiquiri 19, NL 1075 LD",
    phone: "+321 123 4567",
  });

  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Karl Park",
      receiptId: "T231800010663",
      priceList: "Foods&Beverage Standard",
      address: "Daiquiri 19, NL 1075 LD",
      phone: "+321 123 4567",
    },
    {
      id: 2,
      name: "Emily Brown",
      receiptId: "T231800010664",
      priceList: "General Goods Standard",
      address: "Sunset Blvd, CA 90210",
      phone: "+123 987 6543",
    },
    {
      id: 3,
      name: "John Doe",
      receiptId: "T231800010665",
      priceList: "Electronics Standard",
      address: "Main Street 45, NY 10001",
      phone: "+555 123 4567",
    },
  ]);
  return (
    <Layout onSearch={setSearchQuery}>
      <Box style={{ backgroundColor: "#d1ded1", minHeight: "100vh" }}>
        

        <Grid container spacing={2} style={{ padding: 20 }}>
          {/* Left Section */}

          <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Left Section */}

            <div className="lg:col-span-2 bg-white shadow-lg rounded-lg p-4">
              <h2 className="text-xl font-bold mb-4">Sales</h2>
              <div className="overflow-y-auto max-h-80 border border-gray-200 rounded-md">
  <table className="table-auto w-full border-collapse border border-gray-200">
    <thead className="sticky top-0 bg-white z-10">
      <tr style={{ backgroundColor: "#e0ffe0" }}>
        <th className="border border-gray-300 p-2 text-center">Article ID</th>
        <th className="border border-gray-300 p-2 text-center">Article</th>
        <th className="border border-gray-300 p-2 text-center">Quantity</th>
        <th className="border border-gray-300 p-2 text-center">Unit Price</th>
        <th className="border border-gray-300 p-2 text-center">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      {cart.map((item) => (
        <tr key={item.id}>
          <td className="border border-gray-300 p-2 text-center text-sm">{item.article}</td>
          <td className="border border-gray-300 p-2 text-left text-sm">{item.name}</td>
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
            PKR {(item.unitPrice).toFixed(2)}
          </td>
          <td className="border border-gray-300 p-2 text-right text-sm">
            PKR {(item.unitPrice * item.quantity).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
    <tfoot>
      <tr>
        <td
          colSpan={4}
          className="border border-gray-300 p-2 text-right font-bold"
        >
          Total
        </td>
        <td className="border border-gray-300 p-2 text-right font-bold">
          PKR {calculateTotalWithDiscount()}
        </td>
      </tr>
    </tfoot>
  </table>
</div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                <div className="bg-gray-200 p-4 rounded-lg text-center">
                  <p>Discount</p>
                  <p className="font-bold">{discount}%</p>
                </div>
                {/* <div className="bg-gray-200 p-4 rounded-lg text-center">
                  <p>Loyalty Points</p>
                  <p className="font-bold">{loyaltyPoints}</p>
                </div> */}
                {/* <div className="bg-gray-200 p-4 rounded-lg text-center">
                  <p>Tax</p>
                  <p className="font-bold">PKR {tax.toFixed(2)}</p>
                </div> */}
                {/* <div className="bg-gray-200 p-4 rounded-lg text-center">
                  <p>Total</p>
                  <p className="font-bold">
                    PKR {calculateTotalWithDiscount()}
                  </p>
                </div> */}
              </div>
              <div className="mt-2"></div>
              <div
                elevation={3}
                style={{ padding: 8, backgroundColor: "", width: "100%" }}
              >
                <Grid container spacing={3}>
                  {["Sales Item", "Customer"].map((tab) => (
                    <Grid item xs={12} sm={6} md={3} key={tab}>
                      <Button
                        variant="contained"
                        fullWidth
                        style={{
                          backgroundColor:
                            activeTab === tab ? "#006400" : "#90EE90",
                          color: "#ffffff",
                          fontWeight: activeTab === tab ? "bold" : "normal",
                        }}
                        onClick={() => setActiveTab(tab)}
                      >
                        {tab}
                      </Button>
                    </Grid>
                  ))}
                </Grid>

                {activeTab === "Sales Item" && (
                  <Grid container spacing={2} style={{ marginTop: 20 }}>
                    {items.map((item) => (
                      <Grid item xs={4} key={item.id}>
                        <Paper
                          elevation={2}
                          style={{
                            padding: 10,
                            textAlign: "center",
                            width: "80%",
                          }}
                        >
                          <Typography>{item.name}</Typography>
                          <Typography>PKR{item.unitPrice.toFixed(2)}</Typography>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => addToCart(item)}
                            style={{ marginTop: 10 }}
                          >
                            Add to Cart
                          </Button>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
                {/* Customer Info Section */}

                {activeTab === "Customer" && (
                  <div className="bg-gray-100 p-4 rounded-lg mb-4">
                    <h2 className="text-lg font-bold mb-4">Customer List</h2>
                    <ul className="list-disc pl-5">
                      {customers.map((customer) => (
                        <li
                          key={customer.id}
                          className="cursor-pointer p-2 hover:bg-gray-200 rounded"
                          onClick={() => setCustomerInfo(customer)}
                        >
                          <strong>{customer.name}</strong> - {customer.phone}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section */}

            <div className="bg-white shadow-lg rounded-lg p-4">
              {/* {activeTab === "Sales Item" && (
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h2 className="text-lg font-bold">Customer Information</h2>
                  <p>
                    <strong>Receipt ID:</strong> {customerInfo.receiptId}
                  </p>
                  <p>
                    <strong>Price List:</strong> {customerInfo.priceList}
                  </p>
                  <p>
                    <strong>Name:</strong> {customerInfo.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {customerInfo.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {customerInfo.phone}
                  </p>
                </div>
              )} */}
              <div className="max-w-sm mx-auto mt-10">
      <div className="mb-4">
        <input
          type="text"
          value={input}
          readOnly
          className="w-full border border-gray-300 rounded-lg p-4 text-lg font-bold text-right"
        />
      </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleCalculatorInput(num.toString())}
                    className="bg-gray-100 rounded-lg p-4 text-lg font-bold hover:bg-gray-200"
                  >
                    {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => handleCalculatorInput(".")}
                  className="bg-gray-100 rounded-lg p-4 text-lg font-bold hover:bg-gray-200"
                >
                  .
                </button>
                <button
                  onClick={() => handleCalculatorInput("0")}
                  className="bg-gray-100 rounded-lg p-4 text-lg font-bold hover:bg-gray-200"
                >
                  0
                </button>
                <button
                  onClick={() => handleCalculatorInput("*")}
                  className="bg-gray-100 rounded-lg p-4 text-lg font-bold hover:bg-gray-200"
                >
                  ×
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleClear("")}
                  className="bg-red-500 text-white rounded-lg p-4 hover:bg-red-600 w-1/3"
                >
                  <ArrowBack />
                </button>
                <button
                  onClick={applyDiscount}
                  className="bg-green-500 text-white rounded-lg p-4 hover:bg-green-600 flex-grow"
                >
                  <Check />
                </button>
                </div>
                </div>
              
              {/*<TextField
              label="Discount (%)"
              type="number"
              variant="outlined"
              fullWidth
              style={{ marginTop: 20 }}
              onChange={(e) => setDiscount(parseInt(e.target.value) || 0)}
            />*/}

              {/* Payment Quick Options */}
              <Box style={{ marginTop: 20 }}>
                <div className="grid grid-cols-2 gap-2">
                  {[100, 500, 1000, 5000].map((value) => (
                    <button
                      key={value}
                      onClick={() => alert(`Paid Rs. ${value}`)}
                      className="bg-gray-100 rounded-lg p-2 text-lg font-bold hover:bg-gray-200 flex items-center justify-center"
                    >
                      <img
                        src={`/${value}.jpg`}
                        alt={`${value} Rupee Note`}
                        className="h-20 w-auto"
                      />
                    </button>
                  ))}
                </div>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#006400", // Dark green background
                    color: "white", // White text
                    marginTop: 20,
                  }}
                  fullWidth
                  onClick={() => alert("Exact amount paid.")}
                >
                  Confirm Payment
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  style={{ marginTop: 10, backgroundColor: "#9ca3af" }}
                  onClick={() => setCart([])}
                >
                  Cancel Receipt
                </Button>
              </Box>
            </div>
          </div>
        </Grid>
      </Box>
    </Layout>
  );
}

export default POS;
