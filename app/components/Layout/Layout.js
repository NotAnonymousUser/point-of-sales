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

export default function Layout({ children }) {
  const { primaryColor, secondaryColor } = useColor();
  const [navbar, setNavbar] = useState(true);
  const logout = true;

  return (
    <div className={`${font.className} min-h-screen flex flex-col`}>
      {/* Navbar / Header */}
      <header
        className="flex items-center justify-between px-2 w-full border border-gray-100"
        style={{
          backgroundImage: `linear-gradient(to bottom, white 50%, gray 300%)`,
        }}
      >
        <Image
          src="/full-logo.png"
          className="w-auto h-16 p-2"
          alt="NF logo"
          width={200}
          height={200}
        />

        <h1 className="text-xl font-semibold ml-6 text-green-800">
          Welcome To Nizamuddin Faridulhaq
        </h1>

        <div className="flex items-center space-x-4">
          

          {/* Search Bar */}
          <div
            className="flex items-center bg-[#346939] rounded-full px-3 py-1 text-white"
            style={{ minWidth: "200px", height:"40px" }}
          >
            <FiSearch size={20} className="mr-2" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent focus:outline-none text-white flex-1 text-sm placeholder-gray-200"
            />
           
          </div>
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
