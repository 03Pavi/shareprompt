"use client";
import { Box } from "@mui/material";
import Card from "./card";
import React, { useState } from "react";
import axios from "axios"
export interface Thoughts {
  text?: string;
  author?: {
    image: string;
    name: string;
    username: string;
  };
  createdAt?: string;
  tags?: string[];
}
const ThoughtsList = ({ searchQuery }: { searchQuery: string }) => {
  const [list, setList] = useState<Thoughts[]>([]);

  React.useEffect(() => {
    const getThoughts = async () => {
      const response = await fetch("/api/create", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      
      setList(data);
    };
    getThoughts();
  }, [searchQuery]);
  const filteredList = list?.filter((thought: Thoughts) =>
    thought.text?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <Box
      sx={{
        padding: "20px",
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "space-around",
      }}
    >
      {filteredList?.map((i: any, index: number) => (
        <Card
          key={index}
          text={i.text}
          author={i.author}
          createdAt={i.createdAt}
          tags={i.tags}
        />
      ))}
    </Box>
  );
};
export default ThoughtsList;
