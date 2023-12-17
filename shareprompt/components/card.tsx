"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Thoughts } from "./thoughts-list";
import { Alert } from "@mui/material";

const ExpandMore = styled((props: any) => {
  const { expand: any, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CardProps {
  text: string;
  author: {
    _id: string;
    image: string;
    name: string;
    username: string;
  };
  createdAt: string;
  tags: string[];
  likesCount: number;
  _id: string;
  likedPost: string[];
}
export default function Cards(props: CardProps) {
  const [time, setTime] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState(props.likesCount);
  const [message, setMessage] = React.useState("");
  React.useEffect(() => {
    if (props.createdAt) setTime(props.createdAt.substring(0, 10));
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, [props.createdAt]);

  const handleCopy = (text: string) => {
    // Copy the text to the clipboard
    navigator.clipboard.writeText(text);
  };

  // liked post

  const handleLike = async (id: string) => {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = localStorage.getItem("email");
    const postData = {
      postId: id,
      userId: data,
      path: "/",
    };
    await fetch("/api/likes", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    // Toggle color and update count
  };
  return (
    <Card sx={{ maxWidth: 345, minWidth: "300px" }}>
       {message.toLowerCase().includes("copied") && (
          <Alert severity="success" sx={{position:"absolute",marginTop:"-50px"}}>{message}</Alert>
        )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <CardMedia
              component="img"
              height="194"
              image={props.author?.image}
            />
          </Avatar>
        }
       
        action={
          <IconButton aria-label="share" >
            <ContentCopyIcon
              onClick={() => {
                handleCopy(props.text);
                setMessage("copied");
              }}
            />
         
          </IconButton>
        }
        title={props.author?.name}
        subheader={time}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {loading ? "Loading.. ." : props.text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={() => {
            handleLike(props._id);
            setCount((prevCount) =>
              prevCount > count ? prevCount - 1 : prevCount + 1
            );
          }}
        >
          <FavoriteIcon
            style={{
              color: props.likedPost.includes(props._id) ? "red" : "inherit",
            }}
          />
          <p style={{ fontSize: "20px" }}>{count}</p>
        </IconButton>
        {props.tags?.map((i: string, index: number) => {
          return (
            <p key={index} style={{ color: "skyblue", marginLeft: "5px" }}>
              #{i}{" "}
            </p>
          );
        })}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Typography paragraph>Thought:</Typography>

          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>

        </CardContent>
      </Collapse> */}
    </Card>
  );
}
