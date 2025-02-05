"use client";

import React from "react";
import Link from "next/link";
import { Grid } from "@mui/material";
import { useColor } from "../context/ColorContext";
import CustomButton from "../components/buttons/customButton/customButton";
import { IoMdArrowBack } from "react-icons/io";
import Layout from "../components/Layout/Layout";
import CancelButton from "../components/buttons/cancelButton/cancelButton";
import TextBar from "../components/fields/textField/textBar";
import SapDropDown from "../components/fields/dropDown/customDropDown";

const TEXT_BARS = [
  { id: "User", name: "User ID", label: "User ID" },
  { id: "User-Name", name: "User Name", label: "User Name" },
  { id: "User-Email", name: "User Email", label: "User Email" },
  { id: "Department", name: "Department", label: "Department" },
];

const Page = () => {
  const { secondaryColor } = useColor();

  return (
    <Layout>
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex space-x-4 items-center">
          <Link href="/administration/users">
            <IoMdArrowBack size={36} className="mt-1 border-2 border-blue-600 p-2 rounded-full" />
          </Link>
          <p className="text-2xl font-bold mt-1 text-black">Create User</p>
        </div>
        <hr className="border-gray-700 w-full mt-4" />
        <form className="bg-white p-6 pb-8 pt-1 rounded-xl mt-2 min-h-52">
          <Grid container spacing={2} mt={2}>
            {TEXT_BARS.map(({ id, name, label }) => (
              <TextBar key={id} grids={6} id={id} name={name} label={label} type="text" />
            ))}
            <div
              style={{
                display: "flex",
                marginLeft: "14px",
                gap: "80px",
                marginTop: "18px",
                width: "100%",
              }}
            >
              <div style={{ width: "550px" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    gap: "14px", // 
                  }}
                >
                  <SapDropDown
                    label="Role"
                    secondaryColor={secondaryColor}
                    style={{ width: "180px" }}
                  />
                  <SapDropDown
                    label="Line Manager"
                    secondaryColor={secondaryColor}
                    style={{ width: "180px" }}
                  />
                </div>
              </div>
            </div>
            <Grid item xs={10}></Grid>
            <Grid item xs={1} className="mt-44">
              <Link href="/administration/users">
                <CancelButton title="Cancel" />
              </Link>
            </Grid>
            <Grid item xs={1} className="mt-44">
              <Link href="/administration/users">
                <CustomButton title="Save" primaryEnabled={true} classes="p-2" />
              </Link>
            </Grid>
          </Grid>
        </form>
      </main>
    </Layout>
  );
};

export default Page;
