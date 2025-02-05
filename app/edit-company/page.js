"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Grid, Typography, TextField, Paper } from '@mui/material';
import { useColor } from '../context/ColorContext';
import CustomButton from '../components/buttons/customButton/customButton';
import TextBar from '../components/fields/textField/textBar';
import { IoMdArrowBack } from 'react-icons/io';
import Layout from '../components/Layout/Layout';

// Color palettes for primary and secondary
const palettes = {
  primary: ['#3E2723', '#BF360C', '#1B5E20', '#0D47A1', '#4A148C', '#3D5AFE', '#F57F17', '#D50000', '#C62828', '#AD1457', '#6A1B9A', '#283593', '#00695C', '#000000'],
  secondary: ['#FFEBEE', '#E1F5FE', '#E8F5E9', '#FFF9C4', '#FFF3E0', '#FFCCBC', '#FFE0B2', '#FFCDD2', '#F1F8E9', '#E0F7FA', '#FFFDE7', '#F0F4C3', '#FFFFFF']
};

// ColorPalette component for selecting colors
const ColorPalette = ({ color, setColor, title }) => {
  const [customColor, setCustomColor] = useState(color);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setCustomColor(newColor);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value) || value === '') {
      setCustomColor(value);
      if (value) setColor(value);
    }
  };

  return (
    <Grid item xs={12} md={2}>
      <Typography variant="h6">{title} Color:</Typography>
      <Paper elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
        <div style={{
          backgroundColor: customColor,
          width: '100%',
          height: '80px',
          border: '1px solid lightgray',
          borderRadius: '4px',
          marginBottom: '10px'
        }} />
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '5px',
          justifyContent: 'center'
        }}>
          {palettes[title.toLowerCase()].map((color) => (
            <div
              key={color}
              onClick={() => handleColorChange(color)}
              style={{
                backgroundColor: color,
                width: '25px',
                height: '25px',
                cursor: 'pointer',
                border: customColor === color ? '2px solid black' : '1px solid lightgray',
                borderRadius: '4px'
              }}
            />
          ))}
        </div>

        {title === 'Primary' && (
          <TextField
            value={customColor}
            onChange={handleInputChange}
            label="Enter Color Code"
            variant="outlined"
            fullWidth
            margin="normal"
            size="small"
          />
        )}
      </Paper>
    </Grid>
  );
};

const Page = () => {
  const { primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useColor();
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Layout>
      <main className="flex-1 p-4 bg-gray-100">
        <div className="flex space-x-4 items-center">
          <Link href="/administration/company">
            <IoMdArrowBack size={24} className='border-2 border-blue-600 p-1 rounded-full' />
          </Link>
          <p className="text-xl text-black">Edit Company</p>
        </div>
        <hr className="border-gray-700 w-full mt-4" />

        <form className='bg-white p-4 rounded-lg mt-2'>
          <Grid container spacing={2}>
            <TextBar grids={6} id="company" name="company" label="Company Name" type="text" />
            <TextBar grids={6} id="desc" name="desc" label="Description" type="text" />
            <TextBar grids={6} id="sap" name="sap" label="SAP Company" type="text" />
            <TextBar id="file" name="file" type="file" grids={6} onChange={handleImageChange} style={{ padding: "0", display: "flex-start" }} />

            <Grid container item xs={12} spacing={2} style={{ marginTop: '20px' }}>
              <ColorPalette color={primaryColor} setColor={setPrimaryColor} title="Primary" />
              <ColorPalette color={secondaryColor} setColor={setSecondaryColor} title="Secondary" />

              <Grid item xs={12} md={2}>
                <Typography variant="h6">Image Preview:</Typography>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    style={{ width: '100%', height: 'auto', border: '1px solid lightgray', marginTop: '10px' }}
                  />
                )}
              </Grid>
            </Grid>

            <Grid item xs={10}></Grid>
            <Grid item xs={1}>
              <Link href='/administration/company'>
                <CustomButton title="Cancel" primaryEnabled={false} className='mt-16' classes={`px-4 py-2 bg-slate-500 hover:bg-slate-600 font-medium rounded text-md me-2 mb-2`} />
              </Link>
            </Grid>
            <Grid item xs={1}>
              <Link href='/administration/company'>
                <CustomButton title="Save" primaryEnabled={true} className='mt-16' classes="p-2" />
              </Link>
            </Grid>
          </Grid>
        </form>
      </main>
    </Layout>
  );
};

export default Page;
