import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongo-server";
import { currentUser } from "@clerk/nextjs";

// export async function fetchUser(email: string) {
//   try {
//     connectToDB();
//     return await User.findOne({ username:email });
//   } catch (error: any) {
//     throw new Error(`Failed to fetch user: ${error.message}`);
//   }
// }
interface Params {
  userId: string;
  name: string;
  username: string;
  image: string;
  path?:string
}

export async function updateUser({
  userId,
  name,
  username,
  image,
  path
}: Params): Promise<void> {
  try {
    connectToDB();
    const data=await User.findOneAndUpdate(
      { username:username },
      { id: userId, username: username.toLowerCase(), name, image },
      { upsert: true,new:true }
    );
    if (path) {
      revalidatePath(path);
    }
    return data;
  } catch (error: any) {
    throw Error(`Failed to create/update user: ${error.message}`);
  }
}



export const fetchData = async () => {
  const user = await currentUser();
  if (!user) return null;
  return user;
};

// export const fetchDataJSON = async () => {
//   const user = await currentUser();
//   if (!user) return null;
//   const userJSON = JSON.stringify(user);
//   return userJSON;
// };
