import React from "react";
import { updateUser, fetchData } from "@/lib/actions/user.action";
import App from "@/components/Main";
const Home = async () => {
  const user = await fetchData();
  if (!user) return null;
  const userData=JSON.stringify(user)

  
  const data=await updateUser({
    userId: user.id,
    image: user.imageUrl,
    username: user.username || user.emailAddresses[0].emailAddress,
    name: user.firstName || "",
    path: "/",
  });


  return <App user={userData}/>;
};

export default Home;
