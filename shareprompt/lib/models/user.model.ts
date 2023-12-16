import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  username: { type: String, required: true },
  name: { type: String, required: true },
  image: String,
  
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thought",
      require:true
    },
  ],
}, { versionKey: false });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;