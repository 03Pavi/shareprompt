import { revalidatePath } from "next/cache";
import User from "../models/user.model";

import { connectToDB } from "../mongo-server";
import { currentUser } from "@clerk/nextjs";

export async function fetchUser(email: string) {
  try {
    connectToDB();
    return await User.findOne({ email });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
interface Params {
  userId: string;
  name: string;
  username: string;
  image: string;
  path?: string;
}

export async function updateUser({
  userId,
  name,
  username,
  image,
  path,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        userId,
        username: username.toLowerCase(),
        name,
        image,
      },
      { upsert: true }
    );

    if (path) {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function setDarkMode({
  id,
  path,
}: {
  id: string;
  darkMode: boolean;
  path: string;
}): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate({ id: id }, { upsert: true });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to set todo done: ${error.message}`);
  }
}

export const fetchData = async () => {
  const user = await currentUser();
  if (!user) return null;

  return user;
};

export const fetchDataJSON = async () => {
  const user = await currentUser();
  if (!user) return null;

  return user.emailAddresses[0].emailAddress;
};
