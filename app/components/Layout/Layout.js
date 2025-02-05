"use client";

import { SpeedInsights } from "@vercel/speed-insights/next";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "./sidebar";
import { useColor } from "../../context/ColorContext";
import CustomButton from "../buttons/customButton/customButton";
import { font } from "../font/poppins";
import Image from "next/image";
import { FiSearch } from "react-icons/fi"; // Importing search icon

export default function Layout({ children, selectedCustomer }) {
  const { primaryColor, secondaryColor } = useColor();
  const [navbar, setNavbar] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Added local searchQuery state

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // You can optionally pass the search query up if needed by the parent.
    // Example: if (typeof onSearch === 'function') onSearch(e.target.value);
  };
  const logout = true;

  return (
    <div className={`${font.className}  flex flex-col`}>
      {/* Navbar / Header */}
      <header
        className="flex pt-4 h-20 justify-between px-2 w-full border border-gray-100"
        style={{
          backgroundImage: `linear-gradient(to bottom, white 50%, gray 300%)`,
        }}
      >
        <Image
          src="/full-logo.png"
          className="w-auto h-10"
          alt="NF logo"
          width={200}
          height={200}
        />

        <h1 className="text-2xl font-semibold ml-6 text-green-800">
          Welcome {selectedCustomer ? selectedCustomer.name : 'to Nizamuddin Faridulhaq'}
        </h1>

        <div className="flex  space-x-4">
          

         
           <Link href="/">
            <CustomButton
              title="Logout"
              primaryEnabled={true}
              padding="6px 8px"
              marginRight="0"
            />
          </Link>
        </div>
      </header>
      <hr className="w-full border-gray-600" />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1">
        {/* <Sidebar /> */}
        <main className="flex-1 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}