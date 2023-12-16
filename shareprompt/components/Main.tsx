"use client";
import React from "react";
import Header from "./header";
import SearchBar from "./search-bar";
import ThoughtsList from "./thoughts-list";

const App = ({ user }: any) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  //set the user email localstorage

  React.useEffect(() => {
    const data=JSON.parse(user)
    localStorage.setItem("email", data?.emailAddresses[0].emailAddress);
  }, []);
  return (
    <>
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        user={user}
      />
      <ThoughtsList searchQuery={searchQuery} />
    </>
  );
};

export default App;
