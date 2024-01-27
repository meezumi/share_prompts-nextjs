import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
import { sendResponse } from "next/dist/server/image-optimizer";

export const GET = async (request, { params }) => {
  // params will be used for dynamic routing, here that would be user.id
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id
    }).populate("creator");
    
    // sendResponse({message: true});
    return new Response(JSON.stringify(prompts), { status: 200 });

  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
