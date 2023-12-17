import Thought from "@/lib/models/thoughts.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongo-server";
import { NextApiRequest } from "next";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") as string;
  try {
    connectToDB();

    const user = await User.findOne({ username: userId });

    const allThoughts = await Thought.find().populate("author").exec();
    const likedThoughts = allThoughts.filter((thought) =>
      thought.likes.some((like: any) => like && like.equals(user._id))
    );
    const likedThoughtIds = likedThoughts.map((thought) =>
      thought._id.toString()
    );
    return NextResponse.json(likedThoughtIds);
  } catch (error) {
    console.error("Error checking liked posts:", error);
    return NextResponse.error();
  }
}

export async function POST(req: NextApiRequest) {
  let passedValue = await new Response(req.body).text();
  let bodyreq = JSON.parse(passedValue);
  const { postId, userId, path } = bodyreq;
  const user = await User.findOne({ username: userId });
  try {
    connectToDB();
    const thought = await Thought.findById(postId).populate("author").exec();

    if (!thought) {
      throw new Error("Post not found");
    }
    if (thought.likes.includes(user._id)) {
      // throw new Error("User already liked the post");
      thought.likes.pop(user);
      thought.likesCount -= 1;
      const likedThought = await thought.save();
      return NextResponse.json(likedThought);
    }

    thought.likes.push(user);
    thought.likesCount += 1;

    // Save the updated post
    const likedThought = await thought.save();
    if (path) {
      revalidatePath(path);
    }
    return NextResponse.json(likedThought);
  } catch (error) {
    console.error("Error creating thought:", error);
    return NextResponse.error();
  }
}
