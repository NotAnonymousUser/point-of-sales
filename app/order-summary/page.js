"use client";
import Layout from "@/app/components/Layout/Layout";
import React, { useState } from "react";
import { Paper, Tabs, Tab, Box } from "@mui/material";
import { font } from "@/app/components/font/poppins";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

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

function Page() {
  const [tabValue, setTabValue] = useState(0); // Main tabs (categories)
  const [subTabValue, setSubTabValue] = useState("Lawn Mower"); // Sub-categories
  const [cartItems, setCartItems] = useState([]);
  const [orderTab, setOrderTab] = useState(0); // Order/Payment tab

  const handleTabChange = (event, newValue) => setTabValue(newValue);
  const handleOrderTabChange = (event, newValue) => setOrderTab(newValue);
  const handleSubTabChange = (subTab) => setSubTabValue(subTab);
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  const handlePaymentConfirmation = () => {
    setIsPaymentConfirmed(true);
    setIsInvoiceVisible(true); // Show the Show Invoice button
  };
  const products = [
    { id: 1, name: "LAWN MOWER 16'' NF", code: "LMLH07F", price: "0000", origin: "Made in Pakistan", image: "https://via.placeholder.com/120x150", category: "Lawn Mower" },
    { id: 2, name: "CHAIN SAW 20''", code: "CS20A", price: "4500", origin: "Made in USA", image: "https://via.placeholder.com/120x150", category: "Chain Saw" },
    { id: 3, name: "Hedge Trimmer HT30", code: "HT30", price: "2500", origin: "Made in Japan", image: "https://via.placeholder.com/120x150", category: "Hedge Trimmer" },
    { id: 4, name: "Brush Cutter BC40", code: "BC40", price: "3000", origin: "Made in China", image: "https://via.placeholder.com/120x150", category: "Brush Cutter" },
  ];

  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + parseInt(item.product.price) * item.quantity, 0);
  };

  
  const orderTabs = ["Order Items"];

  
  // const orderTabs = ["Order Items"];

  return (
    <Layout>
      <main className="w-full bg-[#b2c9b3] p-4">
        <div className={`w-full ${font.className}`}>
          {/* Tabs for Product Categories */}
          <Paper elevation={3} className="p-6 mb-4">
            <p className="text-2xl font-bold text-black">Order Summary :</p>
            <hr className="border-t-2 border-gray-300 my-4" />
            <Tabs value={tabValue} onChange={handleTabChange}>
                          {orderTabs.map((label, index) => (
                            <Tab
                              key={index}
                              label={label}
                              style={{
                                color: "green",
                                fontWeight: tabValue === index ? "bold" : "normal", 
                              }}
                            />
                          ))}
                        </Tabs>
            </Paper>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Left Side: Product/Order Management */}
            <Paper elevation={3} className="p-6 flex-grow">
              
             {/* Product Listings */}
<TabPanel value={orderTab} index={0}>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {products.map((product) => (
      <div
        key={product.id}
        className="border p-4 bg-gray-100 rounded-lg text-center shadow-md"
      >
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-32 object-cover mx-auto mb-4"
        />

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">
          {product.name}
        </h3>

        {/* Quantity Display */}
        <p className="text-sm text-gray-600 mb-2">
          Quantity: {product.quantity}
        </p>

        {/* Price */}
        <p className="text-md font-bold text-gray-800">
          Price: PKR {product.price}
        </p>
      </div>
    ))}
  </div>
  
</TabPanel>

              
              <TabPanel value={orderTab} index={1}>
                {cartItems.length === 0 ? (
                  <p>No items added yet!</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.product.id} className="flex justify-between mb-2">
                      <span>{item.product.name}</span>
                      <span>Quantity: {item.quantity}</span>
                    </div>
                  ))
                )}
              </TabPanel>
            </Paper>

             
            {/* <Paper elevation={3} className="p-6 lg:w-1/4 h-fit sticky top-4">
              <h2 className="text-lg font-bold mb-4">Payment Details</h2>
              <p>Subtotal: PKR {calculateSubtotal()}</p>
              <p>Discount: PKR 0</p>
              <p>Sales Tax: PKR 0</p>
              <hr />
              <p>Total: PKR {calculateSubtotal()}</p>
              <button className="bg-green-600 w-full mt-4 py-2 text-white">Confirm Payment</button>
            </Paper> */}
           <Paper elevation={3} className="p-6 lg:w-1/4 h-fit sticky top-4">
      <h2 className="text-lg font-bold mb-4">Payment Details</h2>
      <p>Subtotal: PKR {calculateSubtotal()}</p>
      <p>Discount: PKR 0</p>
      <p>Sales Tax: PKR 0</p>
      <hr />
      <p>Total: PKR {calculateSubtotal()}</p>

     
      <button
        className={`w-full mt-4 py-2 text-white ${
          isPaymentConfirmed ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"
        }`}
        onClick={handlePaymentConfirmation}
        disabled={isPaymentConfirmed} // Disable button after click
      >
        Confirm Payment
      </button>

      {/* Show Invoice Button */}
      {isInvoiceVisible && (
        <Link href="/invoice">
        <button className="bg-blue-600 w-full mt-2 py-2 text-white">
          Show Invoice
        </button>
        </Link>
      )}
    </Paper>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page;
