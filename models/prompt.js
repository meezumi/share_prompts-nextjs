import {Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creater: {
    type: Schema.Types.ObjectId,
    // a document in the Db, more specifically a usertype
    ref: "User",
    // one to many: one user can create many prompts
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required :/"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required :/"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;