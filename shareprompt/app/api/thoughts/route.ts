import { connectToDB } from "@/lib/mongo-server";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';
import Thoughts from "@/lib/models/thoughts.model";

const GET = async (request: Request, context: any) => {

  try {
    // Assuming connectToDB initializes the MongoDB connection
    connectToDB();

    // Placeholder for your MongoDB query
    // const query = {};
    const data = await Thoughts.find();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
};

const POST = async (request: Request, context: any) => {
  // try {
  connectToDB();
  console.log(request.body)
  // Assuming you have access to the request body
  //   const { text, authorId, tags } = request.body;

  //   // Create a new thought instance
  //   const newThought = new Thoughts({
  //     text,
  //     author: authorId,
  //     tags, 
  //   });

  //   // Save the new thought to the database
  //   const savedThought = await newThought.save();

  //   const populatedThought = await Thoughts.findById(savedThought._id)
  //     .populate('author', 'username') // Replace 'username' with the fields you want to populate for the author
  //     .populate('tags', 'name'); // Replace 'name' with the fields you want to populate for the tags

  //   return NextResponse.json(populatedThought);
  // } catch (error) {
  //   console.error('Error creating thought:', error);
  //   return NextResponse.error();
  // }
}

export { GET, POST };
