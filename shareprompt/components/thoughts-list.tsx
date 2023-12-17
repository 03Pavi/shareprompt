"use client";
import { Box, Typography } from "@mui/material";
import Card from "./card";
import React, { useState } from "react";
import axios from "axios";
export interface Thoughts {
  _id: string;
  text?: string;
  author?: {
    _id: string;
    image: string;
    name: string;
    username: string;
  };
  createdAt?: string;
  tags?: string[];
  likesCount: number;
}
const ThoughtsList = ({ searchQuery }: { searchQuery: string }) => {
  const [list, setList] = useState<Thoughts[] | any>([]);
  const [likedPost, setLikedPost] = useState<any>([]);

  React.useEffect(() => {
    const getThoughts = async () => {
      const userEmail = localStorage.getItem("email");
      const likedPostResponse = await fetch(`/api/likes?userId=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const response = await fetch("/api/create", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const likedThoughtId = await likedPostResponse.json();
      const data = await response.json();
      setLikedPost(likedThoughtId);
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
      {filteredList.length > 0 ? (
        filteredList?.map((i: any, index: number) => (
          <Card
            key={index}
            text={i.text}
            author={i.author}
            createdAt={i.createdAt}
            tags={i.tags}
            likesCount={i.likesCount}
            _id={i._id}
            likedPost={likedPost}
          />
        ))
      ) : (
        <Typography>No Data Found</Typography>
      )}
    </Box>
  );
};

export default ThoughtsList;