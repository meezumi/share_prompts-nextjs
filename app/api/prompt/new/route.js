import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// we have to create a new route:
export const POST = async (request) => {
    try {
      const { userId, prompt, tag } = await request.json();

      // Validation
      if (!userId || !prompt || !tag) {
        return new Response(JSON.stringify({ error: "Missing required fields: userId, prompt, tag" }), { status: 400 });
      }

      if (prompt.length === 0 || prompt.length > 2000) {
        return new Response(JSON.stringify({ error: "Prompt must be between 1 and 2000 characters" }), { status: 400 });
      }

      if (!/^#[a-zA-Z0-9]+$/.test(tag)) {
        return new Response(JSON.stringify({ error: "Tag must start with # and contain only letters/numbers" }), { status: 400 });
      }

      // will have to create a model for the prompt, just like we did for user.
      await connectToDB();
      const newPrompt = new Prompt({ creator: userId, prompt, tag });

      await newPrompt.save();
      return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.error("Error creating prompt:", error);
        return new Response(JSON.stringify({ error: "Failed to create prompt", details: error.message }), { status: 500 });
    }
}
