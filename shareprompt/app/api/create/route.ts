import { connectToDB } from "@/lib/mongo-server";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import Thoughts from "@/lib/models/thoughts.model";
import { NextApiRequest, NextApiResponse } from "next";
import { Request as Req } from "express";
import User from "@/lib/models/user.model";
interface User {
  authorId: string;
  text: string;
  tags: string;
}

export async function fetchUser(email: string) {
  try {
    connectToDB();
    return await User.findOne({ email });
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}
export const GET = async (request: NextApiRequest, context: any) => {
  try {
    connectToDB();
    const data = await Thoughts.find().populate("author");
    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
};

// export const GET2 = async (request: NextApiRequest, context: any) => {
//   const { userid } = request.query;
//   try {
//     connectToDB();
//     const data = await Thoughts.find({id:userid}).populate('author');
//     return NextResponse.json(data);
//   } catch (err) {
//     console.error(err);
//     return NextResponse.error();
//   }
// };

export async function POST(req: NextApiRequest) {
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { thought, email, tags } = bodyreq;
  try {
    connectToDB();
    const user = await User.findOne({ username: email });
    if (!user) return NextResponse.error();

    const newThought = new Thoughts({
      text: thought,
      author: user._id,
      tags,
    });
    const savedThought = await newThought.save();
    return NextResponse.json(savedThought);
  } catch (error) {
    console.error("Error creating thought:", error);
    return NextResponse.error();
  }
}