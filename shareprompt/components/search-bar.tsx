// SearchBar.js
"use client"
import React from 'react';
import { TextField, Box, Button } from '@mui/material';

const SearchBar = () => {
  const handleSearch = () => {
    // Add your search logic here
  };

  return (
    <Box
      display="flex"
      sx={{ justifyContent: "center", marginTop: "-30px", marginBottom: "20px" }}
    >
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          label="Search Prompts"
          fullWidth
          margin="normal"
        />
        <Button
          variant="outlined"
          color='warning'
          onClick={handleSearch}
          sx={{ marginLeft: '8px', height: "70%", marginTop: "8px", width: "150px" }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
