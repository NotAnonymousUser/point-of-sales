"use client";
import React, { useState, useEffect } from "react";
import { Button, Typography, Paper } from "@mui/material";
import { ArrowBack, Check, LocalOffer, ShoppingCart, Dialpad, Person } from "@mui/icons-material";
import { FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import InvoicePopup from '../components/InvoicePopup';

const RightSection = ({
  activeRightTab,
  setActiveRightTab,
  tabValue,
  handleTabChange,
  tabs,
  productsByTab,
  subTabValue,
  handleSubTabChange,
  addToCart,
  input,
  paymentAmount,
  handleCalculatorInput,
  handleClear,
  activePaymentMethod,
  handlePaymentSubmit,
  applyDiscount,
  isDiscountActive,
  handleDiscountClick,
  handlePaymentMethodClick,
  customers,
  handleCustomerSelect,
  isTaxActive,
  handleTaxClick,
  applyTax,
  cart,
  confirmedPurchases,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration mismatch and client-side rendering
  useEffect(() => {
    setMounted(true);
    setIsClient(true);
  }, []);

  // Prevent multiple button selection
  const handleDiscountButtonClick = () => {
    if (!isTaxActive && !activePaymentMethod) {
      handleDiscountClick();
      handleClear();
      setActivePaymentMethod(null);
      setIsTaxActive(false);
    }
  };

  const handleTaxButtonClick = () => {
    if (!isDiscountActive && !activePaymentMethod) {
      handleTaxClick();
      handleClear();
      setActivePaymentMethod(null);
      setIsDiscountActive(false);
    }
  };

  const handleCardButtonClick = () => {
    if (!isDiscountActive && !isTaxActive) {
      handlePaymentMethodClick('Credit Card');
      handleClear();
      setIsDiscountActive(false);
      setIsTaxActive(false);
    }
  };

  const handleCashButtonClick = () => {
    if (!isDiscountActive && !isTaxActive) {
      handlePaymentMethodClick('Cash');
      handleClear();
      setIsDiscountActive(false);
      setIsTaxActive(false);
    }
  };

  // If not mounted yet, return null or loading state
  if (!mounted) {
    return null;
  }

  const renderProducts = (products) => {
    let filteredProducts = products || [];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.code.toLowerCase().includes(query) ||
        product.origin.toLowerCase().includes(query)
      );
    }

    return filteredProducts.map((product) => (
      <SwiperSlide key={product.id} className="!w-[280px]">
        <div
          className="bg-white border-2 border-gray-200 hover:border-[#90EE90] rounded-xl transition-all duration-200 cursor-pointer h-[380px] mx-2"
          onClick={() => addToCart(product)}
        >
          {/* Product Image Container */}
          <div className="h-[160px] w-full bg-gray-50 rounded-t-xl p-3 flex items-center justify-center border-b border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Product Info Container */}
          <div className="p-4">
            {/* Product Name */}
            <div className="bg-[#e0ffe0] rounded-lg px-3 py-2 mb-4">
              <h3 className="text-gray-900 text-lg font-bold text-center line-clamp-2 leading-tight">
                {product.name}
              </h3>
            </div>

            {/* Product Details */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <span className="text-sm line-clamp-1">{product.origin}</span>
              </div>

              <div className="flex items-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-sm font-medium">Code: {product.code}</span>
              </div>
            </div>

            {/* Price and Add Button */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 font-medium">Price</span>
                <span className="text-lg font-bold text-gray-900">
                  PKR {product.price.toLocaleString()}
                </span>
              </div>
              <button className="bg-[#e0ffe0] hover:bg-[#90EE90] text-gray-800 p-2 rounded-lg transition-colors duration-200 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="font-medium">Add</span>
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    ));
  };

  const handleRowClick = (purchase) => {
    setSelectedPurchase(purchase);
    setShowInvoice(true);
  };

  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4"
      style={{ width: "160%", marginLeft: "-34%", minHeight: "65vh", maxHeight: "850px" }}
    >
      {/* Only render date-sensitive content on client side */}
      {isClient && (
        <>
          {/* Customer Dropdown */}
          <div className="mb-4">
            <select
              className="w-full p-3 border-2 border-[#90EE90] rounded-lg text-gray-700 focus:outline-none focus:border-[#006400]"
              onChange={(e) => {
                const customer = customers.find(c => c.id === parseInt(e.target.value));
                setSelectedCustomer(customer);
                handleCustomerSelect(customer);
              }}
              value={selectedCustomer?.id || ""}
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name} - {customer.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Tab Switch for Right Section */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ShoppingCart sx={{ fontSize: 60 }} />}
              sx={{
                backgroundColor: activeRightTab === "Products" ? "#90EE90" : "white",
                color: activeRightTab === "Products" ? "#006400" : "#006400",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "18px",
                border: `2px solid ${activeRightTab === "Products" ? "#006400" : "#90EE90"}`,
                boxShadow: "none",
                textTransform: "none",
                "& .MuiButton-startIcon": {
                  marginRight: "28px",
                },
                "&:hover": {
                  backgroundColor: activeRightTab === "Products" ? "#90EE90" : "#90EE90",
                  color: "#006400",
                  border: `2px solid ${activeRightTab === "Products" ? "#006400" : "#90EE90"}`,
                }
              }}
              onClick={() => setActiveRightTab("Products")}
            >
              Products
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Dialpad sx={{ fontSize: 60 }} />}
              sx={{
                backgroundColor: activeRightTab === "Numeric Pad" ? "#90EE90" : "white",
                color: activeRightTab === "Numeric Pad" ? "#006400" : "#006400",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "18px",
                border: `2px solid ${activeRightTab === "Numeric Pad" ? "#006400" : "#90EE90"}`,
                boxShadow: "none",
                textTransform: "none",
                "& .MuiButton-startIcon": {
                  marginRight: "28px",
                },
                "&:hover": {
                  backgroundColor: activeRightTab === "Numeric Pad" ? "#90EE90" : "#90EE90",
                  color: "#006400",
                  border: `2px solid ${activeRightTab === "Numeric Pad" ? "#006400" : "#90EE90"}`,
                }
              }}
              onClick={() => setActiveRightTab("Numeric Pad")}
            >
              Numeric Pad
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
              sx={{
                backgroundColor: activeRightTab === "List" ? "#90EE90" : "white",
                color: activeRightTab === "List" ? "#006400" : "#006400",
                padding: "8px",
                height: "50px",
                fontWeight: "bold",
                fontSize: "18px",
                border: `2px solid ${activeRightTab === "List" ? "#006400" : "#90EE90"}`,
                boxShadow: "none",
                textTransform: "none",
                "& .MuiButton-startIcon": {
                  marginRight: "8px",
                },
                "&:hover": {
                  backgroundColor: activeRightTab === "List" ? "#90EE90" : "#90EE90",
                  color: "#006400",
                  border: `2px solid ${activeRightTab === "List" ? "#006400" : "#90EE90"}`,
                }
              }}
              onClick={() => setActiveRightTab("List")}
            >
              List
            </Button>
          </div>

          {/* Search Bar */}
          {activeRightTab === "Products" && (
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border-2 border-[#90EE90] rounded-lg focus:outline-none focus:border-[#006400] text-gray-700"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
              />
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#006400] hover:text-[#90EE90]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          )}

          {/* Content Based on Active Tab */}
          {activeRightTab === "Products" && (
            <div>
              <div className="relative px-0 mb-6">
                <Swiper
                  slidesPerView="auto"
                  spaceBetween={6}
                  navigation={{
                    prevEl: ".tab-prev",
                    nextEl: ".tab-next",
                  }}
                  modules={[Navigation]}
                  className="tab-swiper !pl-0 !pr-12"
                  watchOverflow={true}
                  onSlideChange={(swiper) => {
                    const prevBtn = document.querySelector('.tab-prev');
                    const nextBtn = document.querySelector('.tab-next');
                    if (prevBtn && nextBtn) {
                      prevBtn.style.opacity = swiper.isBeginning ? '0' : '1';
                      prevBtn.style.visibility = swiper.isBeginning ? 'hidden' : 'visible';
                      nextBtn.style.opacity = swiper.isEnd ? '0' : '1';
                      nextBtn.style.visibility = swiper.isEnd ? 'hidden' : 'visible';
                    }
                  }}
                  onInit={(swiper) => {
                    const prevBtn = document.querySelector('.tab-prev');
                    const nextBtn = document.querySelector('.tab-next');
                    if (prevBtn && nextBtn) {
                      prevBtn.style.opacity = '0';
                      prevBtn.style.visibility = 'hidden';
                      nextBtn.style.opacity = swiper.isEnd ? '0' : '1';
                      nextBtn.style.visibility = swiper.isEnd ? 'hidden' : 'visible';
                    }
                  }}
                >
                  {tabs.map((label, index) => (
                    <SwiperSlide key={index} style={{ width: 'auto' }}>
                      <div
                        onClick={(e) => handleTabChange(e, index)}
                        className={`cursor-pointer px-5 py-3 text-lg font-bold transition-all duration-200 rounded-lg ${
                          tabValue === index 
                            ? 'bg-[#006400] text-white shadow-lg' 
                            : 'bg-white text-[#006400] border-2 border-[#90EE90] hover:bg-[#90EE90] hover:text-white hover:border-[#006400]'
                        }`}
                      >
                        {label}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <button 
                  className="tab-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#90EE90] text-gray-800 rounded-r-lg w-8 h-12 flex items-center justify-center shadow-lg hover:bg-[#7BC67B] transition z-20"
                  style={{ 
                    boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
                    border: '1px solid #7BC67B',
                    borderLeft: 'none',
                    opacity: '0',
                    visibility: 'hidden',
                    transition: 'opacity 0.3s ease, visibility 0.3s ease'
                  }}
                >
                  <span className="text-xl font-bold text-white">&lt;</span>
                </button>
                <button 
                  className="tab-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#90EE90] text-gray-800 rounded-l-lg w-8 h-12 flex items-center justify-center shadow-lg hover:bg-[#7BC67B] transition z-20"
                  style={{ 
                    boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
                    border: '1px solid #7BC67B',
                    borderRight: 'none',
                    transition: 'opacity 0.3s ease, visibility 0.3s ease'
                  }}
                >
                  <span className="text-xl font-bold text-white">&gt;</span>
                </button>
              </div>

              {tabs.map((tab, tabIndex) => (
                <div
                  key={tabIndex}
                  role="tabpanel"
                  hidden={tabValue !== tabIndex}
                  id={`simple-tabpanel-${tabIndex}`}
                  aria-labelledby={`simple-tab-${tabIndex}`}
                >
                  {tabValue === tabIndex && (
                    <div>
                      {productsByTab[tab]?.subtabs?.length > 0 && (
                        <div className="mb-4 overflow-x-auto">
                          <div className="flex gap-4 mt-0">
                            {productsByTab[tab].subtabs.map((subtab) => (
                              <button
                                key={subtab}
                                onClick={() => handleSubTabChange(subtab)}
                                className={`px-4 py-2 rounded text-center transition-all duration-200 ${
                                  subTabValue === subtab
                                    ? "bg-[#4CAF50] text-white font-bold"
                                    : "bg-white text-[#006400] border-2 border-[#90EE90] hover:bg-[#90EE90] hover:text-white"
                                }`}
                              >
                                {subtab}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="relative px-10">
                        <Swiper
                          navigation={{
                            prevEl: ".product-prev",
                            nextEl: ".product-next",
                          }}
                          spaceBetween={30}
                          modules={[Navigation]}
                          className="products-swiper !pl-2 !pr-6"
                          watchOverflow={true}
                          breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                          }}
                          onSlideChange={(swiper) => {
                            const prevBtn = document.querySelector('.product-prev');
                            const nextBtn = document.querySelector('.product-next');
                            if (prevBtn && nextBtn) {
                              prevBtn.style.opacity = swiper.isBeginning ? '0' : '1';
                              prevBtn.style.visibility = swiper.isBeginning ? 'hidden' : 'visible';
                              nextBtn.style.opacity = swiper.isEnd ? '0' : '1';
                              nextBtn.style.visibility = swiper.isEnd ? 'hidden' : 'visible';
                            }
                          }}
                          onInit={(swiper) => {
                            const prevBtn = document.querySelector('.product-prev');
                            const nextBtn = document.querySelector('.product-next');
                            if (prevBtn && nextBtn) {
                              prevBtn.style.opacity = '0';
                              prevBtn.style.visibility = 'hidden';
                              nextBtn.style.opacity = swiper.isEnd ? '0' : '1';
                              nextBtn.style.visibility = swiper.isEnd ? 'hidden' : 'visible';
                            }
                          }}
                        >
                          {renderProducts(
                            productsByTab[tab]?.products.filter(
                              (product) =>
                                !subTabValue ||
                                product.subtab === subTabValue
                            )
                          )}
                        </Swiper>
                        <button 
                          className="product-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-[#90EE90] text-gray-800 rounded-r-lg w-8 h-12 flex items-center justify-center shadow-lg hover:bg-[#7BC67B] transition z-20"
                          style={{ 
                            boxShadow: '4px 0 8px rgba(0,0,0,0.1)',
                            border: '1px solid #7BC67B',
                            borderLeft: 'none',
                            opacity: '0',
                            visibility: 'hidden',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease',
                            marginLeft: '16px'
                          }}
                        >
                          <span className="text-xl font-bold text-white">&lt;</span>
                        </button>
                        <button 
                          className="product-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#90EE90] text-gray-800 rounded-l-lg w-8 h-12 flex items-center justify-center shadow-lg hover:bg-[#7BC67B] transition z-20"
                          style={{ 
                            boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
                            border: '1px solid #7BC67B',
                            borderRight: 'none',
                            transition: 'opacity 0.3s ease, visibility 0.3s ease',
                            marginRight: '16px'
                          }}
                        >
                          <span className="text-xl font-bold text-white">&gt;</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeRightTab === "Numeric Pad" && (
            <div className="w-full max-w-lg mx-auto mt-4">
              {/* Input Display */}
              <div className="mb-6">
                <input
                  type="text"
                  value={activePaymentMethod ? paymentAmount : input}
                  readOnly
                  className="w-full border-2 border-gray-300 rounded-lg p-4 text-3xl font-bold text-right bg-white focus:border-gray-400 focus:ring-0 shadow-sm"
                  placeholder={
                    activePaymentMethod ? `Enter ${activePaymentMethod} amount` :
                    isTaxActive ? "Enter tax percentage" :
                    isDiscountActive ? "Enter discount percentage" :
                    "Select an option below"
                  }
                />
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      if (activePaymentMethod || isDiscountActive || isTaxActive) {
                        handleCalculatorInput(num.toString())
                      }
                    }}
                    className={`bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg p-4 text-2xl font-semibold transition-all duration-150 shadow-sm ${
                      activePaymentMethod || isDiscountActive || isTaxActive
                        ? "hover:bg-gray-100 active:bg-gray-200"
                        : "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={() => {
                    if (activePaymentMethod || isDiscountActive || isTaxActive) {
                      handleCalculatorInput(".")
                    }
                  }}
                  className={`bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg p-4 text-2xl font-semibold transition-all duration-150 shadow-sm ${
                    activePaymentMethod || isDiscountActive || isTaxActive
                      ? "hover:bg-gray-100 active:bg-gray-200"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                >
                  .
                </button>
                <button
                  onClick={() => {
                    if (activePaymentMethod || isDiscountActive || isTaxActive) {
                      handleCalculatorInput("0")
                    }
                  }}
                  className={`bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg p-4 text-2xl font-semibold transition-all duration-150 shadow-sm ${
                    activePaymentMethod || isDiscountActive || isTaxActive
                      ? "hover:bg-gray-100 active:bg-gray-200"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                >
                  0
                </button>
                <button
                  onClick={() => {
                    if (activePaymentMethod || isDiscountActive || isTaxActive) {
                      handleCalculatorInput("00")
                    }
                  }}
                  className={`bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg p-4 text-2xl font-semibold transition-all duration-150 shadow-sm ${
                    activePaymentMethod || isDiscountActive || isTaxActive
                      ? "hover:bg-gray-100 active:bg-gray-200"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                >
                  00
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={handleClear}
                  className={`bg-red-50 text-red-600 border-2 border-red-200 rounded-lg p-4 text-xl font-semibold transition-all duration-150 flex items-center justify-center gap-2 shadow-sm ${
                    activePaymentMethod || isDiscountActive || isTaxActive
                      ? "hover:bg-red-100 active:bg-red-200"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
                  </svg>
                  <span>Erase</span>
                </button>
                <button
                  onClick={() => {
                    if (activePaymentMethod) {
                      handlePaymentSubmit();
                    } else if (isTaxActive) {
                      applyTax();
                    } else if (isDiscountActive) {
                      applyDiscount();
                    }
                  }}
                  className={`bg-[#90EE90] text-[#006400] border-2 border-[#62d062] rounded-lg p-4 text-xl font-semibold transition-all duration-150 flex items-center justify-center gap-2 shadow-sm ${
                    activePaymentMethod || isDiscountActive || isTaxActive
                      ? "hover:bg-[#7BC67B] active:bg-[#6BAF6B]"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!(activePaymentMethod || isDiscountActive || isTaxActive)}
                >
                  <Check sx={{ fontSize: 28 }} />
                  <span>Apply</span>
                </button>
              </div>

              {/* Payment Method Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <button
                  onClick={handleDiscountButtonClick}
                  disabled={isTaxActive || activePaymentMethod}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all duration-150 shadow-sm ${
                    isDiscountActive 
                      ? "bg-[#90EE90] text-[#006400] border-[#006400]" 
                      : isTaxActive || activePaymentMethod
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <LocalOffer sx={{ fontSize: 28, marginBottom: 1 }} />
                  <span className="font-semibold text-sm">Discount</span>
                </button>

                <button
                  onClick={handleTaxButtonClick}
                  disabled={isDiscountActive || activePaymentMethod}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all duration-150 shadow-sm ${
                    isTaxActive 
                      ? "bg-[#90EE90] text-[#006400] border-[#006400]" 
                      : isDiscountActive || activePaymentMethod
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3-3 3 3 3-3 3 3 2-2z" />
                  </svg>
                  <span className="font-semibold text-sm">Tax</span>
                </button>
                
                <button
                  onClick={handleCardButtonClick}
                  disabled={isDiscountActive || isTaxActive}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all duration-150 shadow-sm ${
                    activePaymentMethod === 'Credit Card'
                      ? "bg-[#90EE90] text-[#006400] border-[#006400]"
                      : isDiscountActive || isTaxActive
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <FaCreditCard size={28} className="mb-1" />
                  <span className="font-semibold text-sm">Card</span>
                </button>
                
                <button
                  onClick={handleCashButtonClick}
                  disabled={isDiscountActive || isTaxActive}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-lg border-2 transition-all duration-150 shadow-sm ${
                    activePaymentMethod === 'Cash'
                      ? "bg-[#90EE90] text-[#006400] border-[#006400]"
                      : isDiscountActive || isTaxActive
                      ? "bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50 active:bg-gray-100"
                  }`}
                >
                  <FaMoneyBillWave size={28} className="mb-1" />
                  <span className="font-semibold text-sm">Cash</span>
                </button>
              </div>
            </div>
          )}

          {activeRightTab === "List" && (
            <div className="mt-4">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-[#e0ffe0] text-[#006400]">
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Doc #</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Customer Name</th>
                      {/* <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Customer Phone</th> */}
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Item Name</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {confirmedPurchases.length > 0 ? (
                      confirmedPurchases.map((purchase) => (
                        <tr 
                          key={purchase.id} 
                          className="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                          onClick={() => handleRowClick(purchase)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.docNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.customerName}
                          </td>
                          {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.customerPhone}
                          </td> */}
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.items.map(item => item.name).join(", ")}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {purchase.totalQuantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            PKR {parseFloat(purchase.totalPrice).toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                          No confirmed purchases yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Invoice Popup */}
              <InvoicePopup
                open={showInvoice}
                onClose={() => setShowInvoice(false)}
                purchase={selectedPurchase}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RightSection; 