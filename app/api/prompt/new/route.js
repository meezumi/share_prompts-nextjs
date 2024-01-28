import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// we have to create a new route:
export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
      // will have to create a model for the prompt, just like we did for user.
      await connectToDB();
      const newPrompt = new Prompt({ creator: userId, prompt, tag });

      await newPrompt.save();
      return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
