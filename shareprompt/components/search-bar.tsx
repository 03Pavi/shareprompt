// SearchBar.js
"use client";
import React, { useEffect, useState } from "react";
import { TextField, Box, Button } from "@mui/material";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  user,
}: {
  searchQuery: string;
  setSearchQuery: (e: string) => void;
  user: any;
}) => {
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(user);
  
  }, [user]);

//to send user data to create

  const handleSearch = () => {
    setSearchQuery(query);
    setQuery("");
  };

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "center",
        marginTop: "-30px",
        marginBottom: "20px",
      }}
    >
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          label="Search Prompts"
          fullWidth
          margin="normal"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          variant="outlined"
          color="warning"
          onClick={handleSearch}
          sx={{
            marginLeft: "8px",
            height: "70%",
            marginTop: "8px",
            width: "150px",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default SearchBar;
