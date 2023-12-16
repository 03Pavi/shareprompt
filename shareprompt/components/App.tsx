"use client"
import React from "react";
import Header from "./header";
import SearchBar from "./search-bar";
import ThoughtsList from "./thoughts-list";

const App = () => {
    const [searchQuery,setSearchQuery]=React.useState("")

  return (
    <div>
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
      <ThoughtsList searchQuery={searchQuery}/>
    </div>
  );
};

export default App