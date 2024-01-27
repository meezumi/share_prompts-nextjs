import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { sendResponse } from "next/dist/server/image-optimizer";

export const GET = async (request) => {
  try {
    await connectToDB();

    const promptss = await Prompt.find({}).populate("creator");

    // sendResponse({message: true});
    return new Response(JSON.stringify(promptss), { status: 200 });

  } catch (error) {
      return new Response("Failed to fetch all prompts", { status: 500 });
  }
  
};
