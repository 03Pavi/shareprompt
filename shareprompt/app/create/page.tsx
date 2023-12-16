"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Chip,
  Container,
  Grid,
  Box,
  Typography,
  Autocomplete,
  FormControl,
} from "@mui/material";
import { fetchDataJSON } from "@/lib/actions/user.action";
import ThoughtsList from "@/components/thoughts-list";
const maxWords = 230;

const Create: React.FC = async () => {
  const [thought, setThought] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [email, setEmail] = React.useState<any>("");

  React.useEffect(() => {
    const fetchUserData = async () => {
      const email = await fetchDataJSON();
      if (!email) return null;
      else {
        setEmail(email);
      }
    };
    fetchUserData();
  }, []);
  //api
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Check if thought exceeds 230 words
    const wordCount = thought.split(/\s+/).filter(Boolean).length;
    if (wordCount > maxWords) {
      setError("Thought exceeds the maximum word limit (230 words).");
      return;
    }

    try {
      // Make Axios POST request to API endpoint

      const postData = {
        thought,
        email,
        tags,
      };
      const response = await fetch("/api/thoughts", {
        method: "POST",
        cache:"no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      // Handle the response as needed
      // console.log("Response from API:", response.data);
      // Clear form fields
      setThought("");
      setTags([]);
      setError("");
    } catch (error) {
      console.error("Error submitting thought:", error);
      setError("Error submitting thought. Please try again.");
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === " ") {
      event.preventDefault();
      const newValue = event.target.value.trim();
      if (newValue !== "" && !tags.includes(newValue)) {
        setTags([...tags, newValue]);
        setInputValue("");
      }
      event.target.value = "";
    }
    setInputValue("");
  };
  const handleBlur = (event: any) => {
    const newValue = event.target.value.trim();

    if (newValue !== "" && !tags.includes(newValue)) {
      const updatedTags = [...tags, newValue];
      setTags(updatedTags);
    }
    event.target.value = "";
  };
  const handleThoughtChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setThought(event.target.value);
  };

  const handleTagChange = (event: any, newValue: string[]) => {
    const filteredTags = newValue.filter((tag) => tag.trim() !== "");
    setTags(filteredTags);
  };

  return (
    <Box
      sx={{
        padding: 2, // Adjust the padding as needed
        borderRadius: 4,
        height: "100vh",
        width: "100%", // Adjust the border radius as needed
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: "rgba(187, 193, 168, 0.13)",
          padding: "20px",
          boxSizing: "border-box",
          borderRadius: "10px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginTop: "20px", marginBottom: "20px" }}
          gutterBottom
        >
          Write your thoughts
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Thought (Max 230 Words)"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
                value={thought}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => {
                  setThought(event.target.value);
                }}
                error={!!error}
                helperText={error}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <Autocomplete
                  clearOnBlur
                  multiple
                  size="small"
                  limitTags={2}
                  id="tags-filled"
                  options={[]}
                  value={tags}
                  freeSolo
                  onChange={(event: any, newValue: string[]) => {
                    const filteredTags = newValue.filter(
                      (tag) => tag.trim() !== ""
                    );
                    setTags(filteredTags);
                  }}
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      // eslint-disable-next-line react/jsx-key
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  style={{ height: "auto" }}
                  renderInput={(params: any) => (
                    <>
                      <TextField
                        {...params}
                        variant="outlined"
                        value={inputValue}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        label={"Tags"}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
                      />
                    </>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined" color="warning">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>

      {/* <ThoughtsList id={id} /> */}
    </Box>
  );
};

export default Create;
