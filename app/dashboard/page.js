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
  const [tabValue, setTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState("Lawn Mower");
  const [cartItems, setCartItems] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubTabChange = (subTab) => {
    setSubTabValue(subTab);
  };

  const products = [
    { id: 1, name: "LAWN MOWER 16'' NF", code: "LMLH07F", price: "0000", origin: "Made in Pakistan", image: "https://via.placeholder.com/120x150", category: "Lawn Mower" },
    { id: 2, name: "CHAIN SAW 20''", code: "CS20A", price: "4500", origin: "Made in USA", image: "https://via.placeholder.com/120x150", category: "Chain Saw" },
    { id: 3, name: "Hedge Trimmer HT30", code: "HT30", price: "2500", origin: "Made in Japan", image: "https://via.placeholder.com/120x150", category: "Hedge Trimmer" },
    { id: 4, name: "Brush Cutter BC40", code: "BC40", price: "3000", origin: "Made in China", image: "https://via.placeholder.com/120x150", category: "Brush Cutter" },
    { id: 5, name: "Another Lawn Mower", code: "LMLH08G", price: "1500", origin: "Made in UK", image: "https://via.placeholder.com/120x150", category: "Lawn Mower" },
    { id: 6, name: "Powerful Chain Saw", code: "CS22B", price: "6000", origin: "Made in Canada", image: "https://via.placeholder.com/120x150", category: "Chain Saw" },
  ];

  
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
  
      if (existingItem) {
        // Increment quantity if the product already exists
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add the product if it's not in the cart
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };
  
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };



  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + parseInt(item.product.price) * item.quantity, 0);
  };

  return (
    <Layout>
      <main className="flex w-full p-3 bg-gray-100 justify-center">
        <div className={`w-full ${font.className} max-w-7xl`}> {/* Added max-w-7xl for better responsiveness */}
          <Paper elevation={3} className="p-6 mb-4"> {/* Added margin bottom */}
            <p className="text-2xl font-bold text-black">Product Category</p>
            <hr className="border-t-2 border-gray-300 my-4" />
            <Tabs value={tabValue} onChange={handleTabChange}>
              <Tab label="Agricultural & Horticulture" />
              <Tab label="Sports Fields & Grounds" />
              <Tab label="Irrigation" />
              <Tab label="Power Generation" />
              <Tab label="Laboratory" />
              <Tab label="Safety items" />
              {/* Add other tabs as needed */}
            </Tabs>
          </Paper>

          <div className="flex flex-col lg:flex-row gap-4"> {/* Flex for layout */}
            <Paper elevation={3} className="p-6 w-full lg:w-2/3"> {/* Adjusted widths */}
              <div className="flex flex-wrap gap-4 mb-4">
                {["Lawn Mower", "Chain Saw", "Hedge Trimmer", "Brush Cutter"].map((subTab) => (
                  <button
                    key={subTab}
                    className={`px-4 py-2 rounded text-white font-bold ${subTabValue === subTab ? "bg-yellow-500" : "bg-gray-400"}`}
                    onClick={() => handleSubTabChange(subTab)}
                  >
                    {subTab}
                  </button>
                ))}
              </div>

              <TabPanel value={tabValue} index={0}>
                <Swiper
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={20}
                  slidesPerView={3}
                  modules={[Navigation, Pagination]}
                  breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {products.filter(product => product.category === subTabValue).map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="border rounded-lg shadow-lg p-4 bg-gray-100 flex flex-col items-center">
                        <img src={product.image} alt={product.name} className="rounded mb-4 w-32 h-40 object-cover" /> {/* Added object-cover */}
                        <h3 className="text-lg font-bold text-center">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.origin}</p>
                        <p className="text-sm font-semibold">Code: {product.code}</p>
                        <p className="text-md font-bold mt-2">Price: {product.price}</p>
                        <button className="bg-yellow-500 px-4 py-2 rounded text-white font-bold mt-4 hover:bg-yellow-600 transition" onClick={() => addToCart(product)}> {/* Added hover effect */}
                          Add to Trolley
                        </button>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </TabPanel>
            </Paper>

            <Paper elevation={3} className="p-6 w-full lg:w-1/3 h-fit sticky top-4">
        <h2 className="text-lg font-bold mb-4">Current Orders</h2>
        {cartItems.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex justify-between items-center mb-2 border-b pb-2">
                <span>{item.product.name} ({item.product.code})</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => decreaseQuantity(item.product.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item.product)} className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600">+</button> {/* Corrected this line */}
                </div>
              </div>
            ))}
                  <div className="font-bold mt-4 text-right">
                    Subtotal: PKR {calculateSubtotal()}
                  </div>
                  <div className="text-right">
                    Discount: PKR 0
                  </div>
                  <div className="font-bold text-right">
                    Total Sales Tax: PKR 0
                  </div>
                  <hr className="my-2"/>
                  <div className="font-bold text-right">
                    Total: PKR {calculateSubtotal()}
                  </div>
                  <button className="bg-green-500 w-full mt-4 py-2 rounded text-white font-bold hover:bg-green-600 transition">Confirmation</button>
                </div>
              )}
            </Paper>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Page;