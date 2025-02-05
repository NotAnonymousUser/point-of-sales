"use client";
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Layout from "../components/Layout/Layout";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import dynamic from 'next/dynamic';

// Dynamically import Layout with no SSR
const DynamicLayout = dynamic(() => import("../components/Layout/Layout"), {
  ssr: false
});

function POS() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState("");
  const [tax, setTax] = useState("");
  const [isTaxActive, setIsTaxActive] = useState(false);
  const [suspendedOrders, setSuspendedOrders] = useState([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("Agricultural & Horticulture");
  const [activeRightTab, setActiveRightTab] = useState("Products");
  const [tabValue, setTabValue] = useState(0);
  const [showSuspendPopup, setShowSuspendPopup] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [subTabValue, setSubTabValue] = useState("");
  const [isDiscountActive, setIsDiscountActive] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [confirmedPurchases, setConfirmedPurchases] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(null);

  useEffect(() => {
    setMounted(true);
    setCurrentDateTime(new Date());
  }, []);

  const customers = [
    {
      id: 1,
      name: "John Doe",
      phone: "+92 300 1234567"
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "+92 301 2345678"
    },
    {
      id: 3,
      name: "Mike Johnson",
      phone: "+92 302 3456789"
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSubTabValue("");
  };

  const handleSubTabChange = (subTab) => {
    setSubTabValue(subTab);
  };

  const handleSuspend = () => {
    setSuspendedOrders([...suspendedOrders, { items: cart, total }]);
    setCart([]);
    setTotal(0);
  };

  const resumeOrder = (order) => {
    setCart(order.items);
    setTotal(order.total);
    setSuspendedOrders(suspendedOrders.filter((o) => o !== order));
  };

  const deleteOrder = (order) => {
    setSuspendedOrders(suspendedOrders.filter((o) => o !== order));
  };

  const addToCart = (product) => {
    const existingItem = cart.find((cartItem) => cartItem.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === product.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    const updatedTotal = total + Number(product.price);
    setTotal(updatedTotal);
    setLoyaltyPoints(loyaltyPoints + Math.floor(Number(product.price) / 10));
  };

  const calculateTotalWithDiscount = () => {
    const subtotal = cart.reduce(
      (sum, item) => sum + parseFloat(item.price || 0) * item.quantity,
      0
    );
    const discountAmount = (subtotal * (parseFloat(discount) || 0)) / 100;
    const afterDiscount = parseFloat((subtotal - discountAmount).toFixed(2));
    const taxAmount = (afterDiscount * (parseFloat(tax) || 0)) / 100;
    const total = parseFloat((afterDiscount + taxAmount).toFixed(2));
    return total.toFixed(2);
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      );
      setTotal(newTotal);
      return updatedCart;
    });
  };

  const handleCalculatorInput = (value) => {
    if (activePaymentMethod) {
      setPaymentAmount(prev => prev + value);
    } else if (isDiscountActive || isTaxActive) {
      setInput(prev => prev + value);
    } else {
      setInput(prev => prev + value);
    }
  };

  const handleClear = () => {
    if (activePaymentMethod) {
      const currentValue = paymentAmount;
      if (currentValue.length > 0) {
        setPaymentAmount(currentValue.slice(0, -1));
      }
    } else if (isDiscountActive || isTaxActive) {
      const currentValue = input;
      if (currentValue.length > 0) {
        setInput(currentValue.slice(0, -1));
      }
    } else {
      const currentValue = input;
      if (currentValue.length > 0) {
        setInput(currentValue.slice(0, -1));
      }
    }
  };

  const applyDiscount = () => {
    const discountValue = parseFloat(input);
    if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
      alert("Please enter a valid discount percentage between 0 and 100");
      return;
    }
    setDiscount(discountValue);
    setInput("");
    setIsDiscountActive(false);
    setActivePaymentMethod(null);
  };

  const handlePaymentMethodClick = (method) => {
    setActivePaymentMethod(method);
    setIsDiscountActive(false);
    setPaymentAmount("");
  };

  const handlePaymentSubmit = () => {
    if (!paymentAmount) {
      alert("Please enter payment amount");
      return;
    }

    const totalAmount = calculateTotalWithDiscount();
    const paidAmount = parseFloat(paymentAmount);

    if (paidAmount < totalAmount) {
      alert("Payment amount is less than total amount");
      return;
    }

    const change = paidAmount - totalAmount;
    setPaymentDetails({
      method: activePaymentMethod,
      amount: paidAmount,
      change: change
    });
    setInput("");
    setPaymentAmount("");
    setActivePaymentMethod(null);
  };

  const handleDiscountClick = () => {
    setIsDiscountActive(true);
    setIsTaxActive(false);
    setActivePaymentMethod(null);
    setInput("");
  };

  const handleTaxClick = () => {
    setIsTaxActive(true);
    setIsDiscountActive(false);
    setActivePaymentMethod(null);
    setInput("");
  };

  const applyTax = () => {
    const taxValue = parseFloat(input);
    if (isNaN(taxValue) || taxValue < 0 || taxValue > 100) {
      alert("Please enter a valid tax percentage between 0 and 100");
      return;
    }
    setTax(taxValue);
    setInput("");
    setIsTaxActive(false);
    setActivePaymentMethod(null);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
  };

  const handleCancelReceipt = () => {
    setCart([]);
    setDiscount("");
    setTax("");
    setPaymentAmount("");
    setPaymentDetails(null);
    setActivePaymentMethod(null);
    setIsDiscountActive(false);
    setIsTaxActive(false);
    setInput("");
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      const newTotal = updatedCart.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0
      );
      setTotal(newTotal);

      return updatedCart;
    });
  };

  const tabs = [
    "Agricultural & Horticulture",
    "Sports Fields & Grounds",
    "Irrigation",
    "Power Generation",
  ];

  const productsByTab = {
    "Agricultural & Horticulture": {
      subtabs: ["Lawn Mower", "Chain Saw", "Hedge Trimmer", "Brush Cutter"],
      products: [
        {
          id: 1,
          name: "LAWN MOWER",
          code: " LMLH07F",
          price: "100",
          origin: "LAWN MOWER 16″ NF MAKE: PAKISTANI",
          image: "/Lawn-Mower.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 2,
          name: "CALTRIMMER",
          code: "LMFP42C",
          price: "100",
          origin:
            "CAL-TRIMMER COMMERCIAL MOWER HONDA ENGINE GX200 , 25″ REEL 10 BLADE",
          image: "/CALTRIMMER.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 3,
          name: "Oleomac",
          code: "LMFE26E",
          price: "100",
          origin: "Oleomac 1500W 16″ Steel Deck / Italy",
          image: "/Oleomac.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 4,
          name: "Cub-Cadet Ride",
          code: " CUB-CADET",
          price: "100",
          origin: "Cub-Cadet Ride On Lawn Mower",
          image: "/CUBCADE.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 5,
          name: "ECHO CS-1201",
          code: "TCSP05",
          price: "100",
          origin: "ECHO CS-1201 116.3cc 36″ TCSP05/Japan",
          image: "/echo-chainsaw.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 6,
          name: "McCULLOCH",
          code: "TCSE02",
          price: "100",
          origin: "McCULLOCH 1400Watt 18″/20″ TCSE02/EEC",
          image: "/mucculloch.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 7,
          name: "MTD Troybilt",
          code: "TCSP03",
          price: "100",
          origin: "MTD Troybilt TB5518 55cc, 2-STROKE, 18″ BAR",
          image: "/tb5518.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 8,
          name: "IKRA/MTD",
          code: "TCSE01",
          price: "100",
          origin: "IKRA/MTD KS-1400 1400W BAR  GERMANY",
          image: "/efef2000esx.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 9,
          name: "Alko",
          code: "THTE19",
          price: "100",
          origin: "MTD/Oleomac/Alko 600W/230V, 22-24″ blade, Origin ITALY",
          image: "/MTD.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 10,
          name: "MTD ROVER",
          code: "THTP21",
          price: "100",
          origin:
            "MTD ROVER 22.5cc 2-cycle 22-24″ blade KAWASAKI, Origin CHINA/JP",
          image: "/MTD-ROVER.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 11,
          name: "STIHL",
          code: "THTP23",
          price: "100",
          origin:
            "STIHL, HL94 Pole Hedge Trimmer 24″/24cc 2-cycle, Origin Germany",
          image: "/STIHL.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 12,
          name: "Cub Cadet",
          code: "THTP21B",
          price: "100",
          origin:
            "Cub Cadet 22.5cc 2-cycle 22-24″ blade Mitsubishi Engine CC223D, Origin CHINA/JP",
          image: "/No-image.png",
          subtab: "Hedge Trimmer",
        },
        {
          id: 13,
          name: "Troybily",
          code: "TB MULTI FUNCTION",
          price: "100",
          origin: "Troybily Multi Function Brush Cutter",
          image: "/troybilt.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 14,
          name: "MTD CUB CADET",
          code: "TBCP15A",
          price: "100",
          origin: "MTD CUB CADET 43cc 2-CYCLE KAWASAK",
          image: "/MTD-CUB.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 15,
          name: "HONDA BLADE",
          code: "TBCP15",
          price: "100",
          origin: "HONDA 36cc 4-CYCLE BLADE Honda Thailand",
          image: "/bruchcuttter.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 16,
          name: "MTD CUB-CADET",
          code: "TBCP15B",
          price: "100",
          origin: "MTD CUB-CADET 34.4CC 2-CYCLE KAWASAKI",
          image: "/brushcutter.jpg",
          subtab: "Brush Cutter",
        },
      ],
    },
    "Sports Fields & Grounds": {
      subtabs: [
        "TORO Mowers",
        "Turf Equipments",
        "SPRINKLERS",
        "Sports Accessories",
      ],
      products: [
        {
          id: 17,
          name: "GM FLEX",
          code: "Not Available",
          price: "100",
          origin: "GREENMASTER FLEX",
          image: "/TORO-GM-FLEX.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 18,
          name: "REELMASTER",
          code: "Not Available",
          price: "100",
          origin: "REELMASTER 5610",
          image: "/RM-5610.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 19,
          name: "GM 1600",
          code: "Not Available",
          price: "100",
          origin: "GREENMASTER 1600",
          image: "/TORO-GM1600.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 20,
          name: "RM 5410",
          code: "Not Available",
          price: "100",
          origin: "REELMASTER 5410",
          image: "/RM-5410-D.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 21,
          name: "VERTICUTTER",
          code: "LMFP31A",
          price: "100",
          origin: "VERTICUTTER WITH HONDA ENGINE GS540",
          image: "/edit-verticutter.jpg",
          subtab: "Turf Equipments",
        },
        {
          id: 22,
          name: "DETHATCHING",
          code: "LMFP31B",
          price: "100",
          origin: "DETHATCHER WITH HONDA ENGINE LYS461A",
          image: "/LYS46BHH1.png",
          subtab: "Turf Equipments",
        },
        {
          id: 23,
          name: "GREEN SCARIFIER",
          code: "LMFP31C",
          price: "100",
          origin: "GREEN SCARIFIER WITH HONDA ENGINE SH55480",
          image: "/edit-push-verticutter.jpg",
          subtab: "Turf Equipments",
        },
        {
          id: 24,
          name: "dia BRASS",
          code: "LSF111E",
          price: "100",
          origin: "11550 90ft dia BRASS ADJ IMPACT [0.75″MT] ORIGIN TAIWAN",
          image: "/SPRINKLERS01.jpg",
          subtab: "SPRINKLERS",
        },
        {
          id: 25,
          name: " BRASS ADJ",
          code: "LSF111F",
          price: "100",
          origin: "11556 110ft BRASS ADJ IMPACT [1.0″MT] ORIGIN TAIWAN",
          image: "/SPRINKLERS02.jpg",
          subtab: "SPRINKLERS",
        },
        {
          id: 26,
          name: "BRASS ADJ",
          code: "LMFP31C",
          price: "100",
          origin: "11557 156ft BRASS ADJ IMPACT [1.25″MT] ORIGIN TAIWAN",
          image: "/SPRINKLERS03.jpg",
          subtab: "SPRINKLERS",
        },
        {
          id: 27,
          name: "Golf Ball Washer",
          code: "Not Available",
          price: "100",
          origin: "Brand: Standard Golf",
          image: "/Golf-Ball-Washer.jpg",
          subtab: "Sports Accessories",
        },
        {
          id: 28,
          name: "Drag Mat Cocoa",
          code: "Not Available",
          price: "100",
          origin: "Brand: Standard Golf",
          image: "/Drag-Mat-Cocoa.jpg",
          subtab: "Sports Accessories",
        },
      ],
    },
    Irrigation: {
      subtabs: [
        "Impact Sprinklers",
        "Pop-up Sprinklers",
        "Oscilating Sprinklers",
        "Hose Guns",
      ],
      products: [
        {
          id: 29,
          name: "SPRINKLER SET",
          code: "LSF121",
          price: "100",
          origin: "JINLONG 50 SPRINKLER SET (W/ENGINE+PUMP) ORIGIN CHINA",
          image: "/JINLONG.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 30,
          name: " FULL BIG GUN",
          code: "LSF125A",
          price: "100",
          origin: "NELSON F75 FULL BIG GUN 100ft+ RADIUS ORIGIN USA",
          image: "/Nelson.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 31,
          name: "dia PLASTIC",
          code: "LSF092A",
          price: "100",
          origin: "70ft 7302B 70'dia PLASTIC ADJ IMPACT (0.5″) ORIGIN TAIWAN",
          image: "/impex-sprinkler.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 32,
          name: "Plastic Sprinkler",
          code: "LSF126B",
          price: "100",
          origin: "Greenglow Plastic Sprinkler Full 3/4″ 8037 ORIGIN CHINA",
          image: "/plasticbrass.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 33,
          name: "HUNTER PGP-PGJ",
          code: "LSF100F",
          price: "100",
          origin: "HUNTER PGP-PGJ / TORO S800 ORIGIN US/MEXICO",
          image: "/PGJ.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 34,
          name: "POP-UP",
          code: "LSF102",
          price: "100",
          origin: "7800/11308/9600 POP-UP ADJ IMPACT [0.5″] ORIGIN TAIWAN",
          image: "/LSF102.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 35,
          name: "Rotor pop-up",
          code: "LSF100E1",
          price: "100",
          origin: "TORO T7 Rotor pop-up, 83ft radius ORIGIN MEXICO",
          image: "/ToroT7.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 36,
          name: "ADJ GEAR",
          code: "LSF100E",
          price: "100",
          origin: "TORO T5P 4″ ADJ GEAR DRIVE ROTOR 50ft ORIGIN USA",
          image: "/Toro.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 37,
          name: "ADJ Sprinkler",
          code: "Not Available",
          price: "100",
          origin: "2ARM Adjustable Sprinkler",
          image: "/2arm-green.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 38,
          name: "HELICOPTER",
          code: "LSF070",
          price: "100",
          origin: "11621-C HELICOPTER REVOLVING SPRINKLER ORIGIN TAIWAN",
          image: "/HELICOPTER.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 39,
          name: "POLY",
          code: "LSF067B",
          price: "100",
          origin: "W2026A FROG SHAPE POLY RESIN SPRAY HEAD ORIGIN TAIWAN",
          image: "/frog.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 40,
          name: "STATIONARY",
          code: "LSF088",
          price: "100",
          origin: "7306R 30×15′ RECTANGULAR HOLE STATIONARY ORIGIN TAIWAN",
          image: "/LSF087A.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 41,
          name: "PISTOL GRIP",
          code: "LSF017D",
          price: "100",
          origin: "Brass head pistol grip hose nozzle W0514RA-A",
          image: "/Brass-head-pistol.jpg",
          subtab: "Hose Guns",
        },
        {
          id: 42,
          name: "METAL GUN",
          code: "LSF023B",
          price: "100",
          origin: "11108 5-FUNCTION INSULATED METAL GUN",
          image: "/INSULATED-METAL-GUN.jpg",
          subtab: "Hose Guns",
        },
        {
          id: 43,
          name: "AQUA GUN ",
          code: "LSF019A",
          price: "100",
          origin: "507A/4010 PLASTIC AQUA GUN W/ADAPTER",
          image: "/PLASTIC AQUA-GUN.jpg",
          subtab: "Hose Guns",
        },
        {
          id: 44,
          name: "METAL AQUA GUN",
          code: "LSF024",
          price: "100",
          origin: "11050A METAL AQUA GUN",
          image: "/METAL-AQUA-GUN.jpg",
          subtab: "Hose Guns",
        },
      ],
    },
    "Power Generation": {
      subtabs: [],
      products: [
        {
          id: 45,
          name: "ER2500CX 2 Kva",
          code: "Not Available",
          price: "100",
          origin: "Model: ER2500CX 2 Kva",
          image: "/ep2500.jpg",
        },
        {
          id: 46,
          name: "EG6500CXS 5 Kva",
          code: "Not Available",
          price: "100",
          origin: "Model: EG6500CXS 5 Kva",
          image: "/eg6500cxs.jpg",
        },
        {
          id: 47,
          name: "EM6000GN 4 Kva",
          code: "Not Available",
          price: "100",
          origin: "Model: EM6000GN 4 Kva",
          image: "/em6000.jpg",
        },
        {
          id: 48,
          name: "EG6500CXS 5 Kva",
          code: "Not Available",
          price: "100",
          origin: "Model: EG6500CXS 5 Kva",
          image: "/EM10000.jpg",
        },
      ],
    },
    Laboratory: {
      subtabs: [],
      products: [],
    },
    "Safety items": {
      subtabs: [],
      products: [],
    },
  };

  const handlePaymentConfirmation = () => {
    if (!selectedCustomer) {
      alert("Please select a customer before confirming payment");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!currentDateTime) return;

    const purchase = {
      id: `${currentDateTime.getTime()}-${confirmedPurchases.length}`,
      date: currentDateTime.toISOString().split('T')[0],
      time: currentDateTime.toTimeString().split(' ')[0],
      docNumber: `INV-${String(confirmedPurchases.length + 1).padStart(3, '0')}`,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      totalQuantity: cart.reduce((total, item) => total + item.quantity, 0),
      totalPrice: calculateTotalWithDiscount(),
      discount: discount ? parseFloat(discount) : 0,
      tax: tax ? parseFloat(tax) : 0,
      paymentMethod: activePaymentMethod
    };

    setConfirmedPurchases([...confirmedPurchases, purchase]);
    setCart([]);
    setDiscount("");
    setTax("");
    setPaymentAmount("");
    setPaymentDetails("");
    setActivePaymentMethod("");
    setInput("");
    setIsDiscountActive(false);
    setIsTaxActive(false);
  };

  // Don't render until after hydration and datetime is set
  if (!mounted || !currentDateTime) {
    return null;
  }

  return (
    <DynamicLayout selectedCustomer={selectedCustomer}>
      <Box style={{ backgroundColor: "#d1ded1", minHeight: "100vh" }}>
        <Grid container spacing={2}>
          <div className="container mx-3 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <LeftSection
              cart={cart}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
              discount={discount}
              paymentDetails={paymentDetails}
              calculateTotalWithDiscount={calculateTotalWithDiscount}
              setShowCancelPopup={setShowCancelPopup}
              setShowSuspendPopup={setShowSuspendPopup}
              showCancelPopup={showCancelPopup}
              showSuspendPopup={showSuspendPopup}
              handleCancelReceipt={handleCancelReceipt}
              handleSuspend={handleSuspend}
              suspendedOrders={suspendedOrders}
              resumeOrder={resumeOrder}
              deleteOrder={deleteOrder}
              tax={tax}
              handlePaymentConfirmation={handlePaymentConfirmation}
            />

            <RightSection
              activeRightTab={activeRightTab}
              setActiveRightTab={setActiveRightTab}
              tabValue={tabValue}
              handleTabChange={handleTabChange}
              tabs={tabs}
              productsByTab={productsByTab}
              subTabValue={subTabValue}
              handleSubTabChange={handleSubTabChange}
              addToCart={addToCart}
              input={input}
              paymentAmount={paymentAmount}
              handleCalculatorInput={handleCalculatorInput}
              handleClear={handleClear}
              activePaymentMethod={activePaymentMethod}
              setActivePaymentMethod={setActivePaymentMethod}
              handlePaymentSubmit={handlePaymentSubmit}
              applyDiscount={applyDiscount}
              isDiscountActive={isDiscountActive}
              setIsDiscountActive={setIsDiscountActive}
              handleDiscountClick={handleDiscountClick}
              handlePaymentMethodClick={handlePaymentMethodClick}
              customers={customers}
              handleCustomerSelect={handleCustomerSelect}
              isTaxActive={isTaxActive}
              setIsTaxActive={setIsTaxActive}
              handleTaxClick={handleTaxClick}
              applyTax={applyTax}
              cart={cart}
              confirmedPurchases={confirmedPurchases}
            />
          </div>
        </Grid>
      </Box>
    </DynamicLayout>
  );
}

export default POS;
