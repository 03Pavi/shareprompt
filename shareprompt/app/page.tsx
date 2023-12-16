import React from "react";
import { updateUser, fetchData } from "@/lib/actions/user.action";
import App from "@/components/App";
const Home = async () => {
  const user = await fetchData();

  if (!user) return null;
  await updateUser({
    userId: user.id,
    image: user.imageUrl,
    username: user.username || user.emailAddresses[0].emailAddress,
    name: user.firstName || "",
    path: "/",
  });

  return (
      <App />
  );
};

export default Home;
