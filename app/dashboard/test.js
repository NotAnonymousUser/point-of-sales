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
  const [tabValue, setTabValue] = useState(0);
  const [subTabValue, setSubTabValue] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSubTabValue(""); // Reset subtab when main tab changes
  };

  const handleSubTabChange = (subTab) => {
    setSubTabValue(subTab);
  };

  const tabs = [
    "Agricultural & Horticulture",
    "Sports Fields & Grounds",
    "Irrigation",
    "Power Generation",
    "Laboratory",
    "Safety items",
  ];

  const productsByTab = {
    "Agricultural & Horticulture": {
      subtabs: ["Lawn Mower", "Chain Saw", "Hedge Trimmer", "Brush Cutter"],
      products: [
        {
          id: 1,
          name: "LAWN MOWER 16″ NF",
          code: " LMLH07F",
          price: "100",
          origin: "LAWN MOWER 16″ NF MAKE: PAKISTANI",
          image: "/Lawn-Mower.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 2,
          name: "CALTRIMMER 10 BLADES″",
          code: "LMFP42C",
          price: "100",
          origin:
            "CAL-TRIMMER COMMERCIAL MOWER HONDA ENGINE GX200 , 25″ REEL 10 BLADE",
          image: "/CALTRIMMER.jpg",
          subtab: "Lawn Mower",
        },
        {
          id: 3,
          name: "Oleomac 1500W 16″",
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
          name: "ECHO CS-1201 116.3cc 36″",
          code: "TCSP05",
          price: "100",
          origin: "ECHO CS-1201 116.3cc 36″ TCSP05/Japan",
          image: "/echo-chainsaw.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 6,
          name: "McCULLOCH 1400Watt",
          code: "TCSE02",
          price: "100",
          origin: "McCULLOCH 1400Watt 18″/20″ TCSE02/EEC",
          image: "/mucculloch.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 7,
          name: "MTD Troybilt  55cc",
          code: "TCSP03",
          price: "100",
          origin: "MTD Troybilt TB5518 55cc, 2-STROKE, 18″ BAR",
          image: "/tb5518.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 8,
          name: "IKRA/MTD KS-1400 1400W ",
          code: "TCSE01",
          price: "100",
          origin: "IKRA/MTD KS-1400 1400W BAR  GERMANY",
          image: "/efef2000esx.jpg",
          subtab: "Chain Saw",
        },
        {
          id: 9,
          name: "MTD/Oleomac/Alko",
          code: "THTE19",
          price: "100",
          origin: "MTD/Oleomac/Alko 600W/230V, 22-24″ blade, Origin ITALY",
          image: "/MTD.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 10,
          name: "MTD ROVER 22.5cc",
          code: "THTP21",
          price: "100",
          origin:
            "MTD ROVER 22.5cc 2-cycle 22-24″ blade KAWASAKI, Origin CHINA/JP",
          image: "/MTD-ROVER.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 11,
          name: "STIHL, HL94 Pole",
          code: "THTP23",
          price: "100",
          origin:
            "STIHL, HL94 Pole Hedge Trimmer 24″/24cc 2-cycle, Origin Germany",
          image: "/STIHL.jpg",
          subtab: "Hedge Trimmer",
        },
        {
          id: 12,
          name: "Cub Cadet 22.5cc",
          code: "THTP21B",
          price: "100",
          origin:
            "Cub Cadet 22.5cc 2-cycle 22-24″ blade Mitsubishi Engine CC223D, Origin CHINA/JP",
          image: "/No-image.png",
          subtab: "Hedge Trimmer",
        },
        {
          id: 13,
          name: "Troybily Multi Function",
          code: "TB MULTI FUNCTION",
          price: "100",
          origin: "Troybily Multi Function Brush Cutter",
          image: "/troybilt.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 14,
          name: "MTD CUB CADET 43cc",
          code: "TBCP15A",
          price: "100",
          origin: "MTD CUB CADET 43cc 2-CYCLE KAWASAK",
          image: "/MTD-CUB.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 15,
          name: "HONDA 36cc BLADE",
          code: "TBCP15",
          price: "100",
          origin: "HONDA 36cc 4-CYCLE BLADE Honda Thailand",
          image: "/bruchcuttter.jpg",
          subtab: "Brush Cutter",
        },
        {
          id: 16,
          name: "MTD CUB-CADET 34.4CC",
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
          name: "GREENMASTER FLEX",
          code: "Not Available",
          price: "100",
          origin: "GREENMASTER FLEX",
          image: "/TORO-GM-FLEX.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 18,
          name: "REELMASTER 5610",
          code: "Not Available",
          price: "100",
          origin: "REELMASTER 5610",
          image: "/RM-5610.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 19,
          name: "GREENMASTER 1600",
          code: "Not Available",
          price: "100",
          origin: "GREENMASTER 1600",
          image: "/TORO-GM1600.jpg",
          subtab: "TORO Mowers",
        },
        {
          id: 20,
          name: "REELMASTER 5410",
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
          name: "11550 90ft dia BRASS",
          code: "LSF111E",
          price: "100",
          origin: "11550 90ft dia BRASS ADJ IMPACT [0.75″MT] ORIGIN TAIWAN",
          image: "/SPRINKLERS01.jpg",
          subtab: "SPRINKLERS",
        },
        {
          id: 25,
          name: "11556 110ft BRASS ADJ",
          code: "LSF111F",
          price: "100",
          origin: "11556 110ft BRASS ADJ IMPACT [1.0″MT] ORIGIN TAIWAN",
          image: "/SPRINKLERS02.jpg",
          subtab: "SPRINKLERS",
        },
        {
          id: 26,
          name: "11557 156ft BRASS ADJ",
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
          name: "JINLONG 50 SPRINKLER SET",
          code: "LSF121",
          price: "100",
          origin: "JINLONG 50 SPRINKLER SET (W/ENGINE+PUMP) ORIGIN CHINA",
          image: "/JINLONG.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 30,
          name: "NELSON F75 FULL BIG GUN",
          code: "LSF125A",
          price: "100",
          origin: "NELSON F75 FULL BIG GUN 100ft+ RADIUS ORIGIN USA",
          image: "/Nelson.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 31,
          name: "70ft 7302B 70’dia PLASTIC",
          code: "LSF092A",
          price: "100",
          origin: "70ft 7302B 70’dia PLASTIC ADJ IMPACT (0.5″) ORIGIN TAIWAN",
          image: "/impex-sprinkler.jpg",
          subtab: "Impact Sprinklers",
        },
        {
          id: 32,
          name: "Greenglow Plastic Sprinkler",
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
          name: "7800/11308/9600 POP-UP",
          code: "LSF102",
          price: "100",
          origin: "7800/11308/9600 POP-UP ADJ IMPACT [0.5″] ORIGIN TAIWAN",
          image: "/LSF102.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 35,
          name: "TORO T7 Rotor pop-up",
          code: "LSF100E1",
          price: "100",
          origin: "TORO T7 Rotor pop-up, 83ft radius ORIGIN MEXICO",
          image: "/ToroT7.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 36,
          name: "TORO T5P 4″ ADJ GEAR",
          code: "LSF100E",
          price: "100",
          origin: "TORO T5P 4″ ADJ GEAR DRIVE ROTOR 50ft ORIGIN USA",
          image: "/Toro.jpg",
          subtab: "Pop-up Sprinklers",
        },
        {
          id: 37,
          name: "2ARM Adjustable Sprinkler",
          code: "Not Available",
          price: "100",
          origin: "2ARM Adjustable Sprinkler",
          image: "/2arm-green.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 38,
          name: "11621-C HELICOPTER",
          code: "LSF070",
          price: "100",
          origin: "11621-C HELICOPTER REVOLVING SPRINKLER ORIGIN TAIWAN",
          image: "/HELICOPTER.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 39,
          name: "W2026A FROG SHAPE POLY",
          code: "LSF067B",
          price: "100",
          origin: "W2026A FROG SHAPE POLY RESIN SPRAY HEAD ORIGIN TAIWAN",
          image: "/frog.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 40,
          name: "7306R 30×15′ RECTANGULAR",
          code: "LSF088",
          price: "100",
          origin: "7306R 30×15′ RECTANGULAR HOLE STATIONARY ORIGIN TAIWAN",
          image: "/LSF087A.jpg",
          subtab: "Oscilating Sprinklers",
        },
        {
          id: 41,
          name: "Brass head pistol grip",
          code: "LSF017D",
          price: "100",
          origin: "Brass head pistol grip hose nozzle W0514RA-A",
          image: "/Brass-head-pistol.jpg",
          subtab: "Hose Guns",
        },
        {
          id: 42,
          name: "INSULATED METAL GUN",
          code: "LSF023B",
          price: "100",
          origin: "11108 5-FUNCTION INSULATED METAL GUN",
          image: "/INSULATED-METAL-GUN.jpg",
          subtab: "Hose Guns",
        },
        {
          id: 43,
          name: "PLASTIC AQUA GUN ",
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
      ], // Default to an empty array
    },
    Laboratory: {
      subtabs: [],
      products: [], // Default to an empty array
    },
    "Safety items": {
      subtabs: [],
      products: [], // Default to an empty array
    },
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { product, quantity: 1 }];
      }
    });
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + parseInt(item.product.price) * item.quantity,
      0
    );
  };

  const renderProducts = (products) =>
    (products || []).map((product) => (
      <SwiperSlide key={product.id}>
        <div
          className="border rounded-lg shadow-lg p-2 bg-gray-100 flex flex-col items-center"
          style={{
            minHeight: "26rem", // Minimum height for the card
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="rounded mb-2 w-48 h-44 object-cover"
          />
          <div className="bg-[#d9eddb] text-center rounded-lg px-4 py-2 mb-3">
            <h3 className="text-lg font-bold">{product.name}</h3>
          </div>
          <p className="text-sm text-gray-500 text-left mb-1 w-full">
            {product.origin}
          </p>
          <p className="text-sm font-semibold text-left w-full">
            Code: {product.code}
          </p>
          <p className="text-md font-bold text-left w-full mt-2">
            Price:${product.price}
          </p>
          {/* Add to Trolley Button */}
          <div className="mt-auto w-full flex justify-center"></div>
          <button
            className="bg-yellow-500 px-4 py-2 rounded text-white font-bold mt-4 hover:bg-yellow-600 hover:scale-105 transition-transform duration-200 flex items-center gap-2"
            onClick={() => addToCart(product)}
          >
            Add to Trolley <FaShoppingCart className="text-white" />
          </button>
        </div>
      </SwiperSlide>
    ));

  return (
    <Layout>
      <main className="w-full bg-[#b2c9b3] p-4">
        <div className={`w-full ${font.className}`}>
          <Paper
            elevation={3}
            className="p-6 mb-4"
            style={{
              backgroundImage: `linear-gradient(to bottom, white 50%, gray 800%)`,
            }}
          >
            <p className="text-2xl font-bold text-black">Product Categories:</p>
            <hr className="border-t-2 border-gray-300 my-4" />
            <Tabs value={tabValue} onChange={handleTabChange}>
              {tabs.map((label, index) => (
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
            <Paper elevation={3} className="p-6 flex-grow">
              {tabs.map((tab, index) => (
                <TabPanel key={index} value={tabValue} index={index}>
                  {productsByTab[tab]?.subtabs?.length > 0 ? (
                    <div className="mb-4">
                      <div className="flex gap-4 mt-0">
                        {productsByTab[tab].subtabs.map((subtab) => (
                          <button
                            key={subtab}
                            onClick={() => handleSubTabChange(subtab)}
                            className={`px-4 py-2 rounded ${
                              subTabValue === subtab
                                ? "bg-green-600 text-white font-bold"
                                : "bg-gray-200 hover:bg-gray-300"
                            }`}
                          >
                            {subtab}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {productsByTab[tab]?.products?.length === 0 ? (
                    <p>No products available for this tab.</p>
                  ) : (
                    <div className="relative max-w-screen-lg mx-auto">
                      <Swiper
                        navigation={{
                          prevEl: ".custom-prev",
                          nextEl: ".custom-next",
                        }}
                        pagination={{ clickable: true }}
                        spaceBetween={20}
                        slidesPerView={3}
                        modules={[Navigation]}
                        breakpoints={{
                          320: { slidesPerView: 1 },
                          640: { slidesPerView: 2 },
                          1024: { slidesPerView: 3 },
                        }}
                        className="max-w-full overflow-hidden"
                      >
                        {renderProducts(
                          productsByTab[tab]?.products.filter(
                            (product) =>
                              !subTabValue || product.subtab === subTabValue
                          )
                        )}
                      </Swiper>

                      {/* Custom Navigation Buttons */}
                      <button className="custom-prev absolute top-1/2 left-[-2rem] transform -translate-y-1/2 bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-400 transition z-50">
                        &lt;
                      </button>
                      <button className="custom-next absolute top-1/2 right-[-2rem] transform -translate-y-1/2 bg-gray-300 text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-400 transition z-50">
                        &gt;
                      </button>
                    </div>
                  )}
                </TabPanel>
              ))}
            </Paper>
            <Paper elevation={3} className="p-6 lg:w-1/4 h-fit sticky top-4">
              <h2 className="text-lg font-bold mb-4">Current Orders</h2>
              {cartItems.length === 0 ? (
                <p>No items in cart.</p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between items-center mb-2 border-b pb-2"
                    >
                      <span>
                        {item.product.name} ({item.product.code})
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQuantity(item.product.id)}
                          className="px-2 py-0.5 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item.product)}
                          className="px-2 py-0.5 bg-green-800 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="font-bold mt-4 text-right">
                    Subtotal: ${calculateSubtotal()}
                  </div>
                  <div className="text-right">Discount: $0</div>
                  <div className="font-bold text-right">
                    Total Sales Tax: $0
                  </div>
                  <hr className="my-2" />
                  <div className="font-bold text-right">
                    Total: ${calculateSubtotal()}
                  </div>
                  <Link href="/order-summary">
                    <button className="bg-green-600 w-full mt-4 py-2 rounded text-white font-bold hover:bg-green-500 transition">
                      Confirmation
                    </button>
                  </Link>
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
