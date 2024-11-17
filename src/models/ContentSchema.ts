import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

export const Content = model("Content", ContentSchema);
