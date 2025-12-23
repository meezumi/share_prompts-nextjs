import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// GET (read)
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompt = await Prompt.findById(params.id).populate("creator")
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}


// PATCH (update)
export const PATCH = async (request, { params }) => {
    try {
        const { prompt, tag } = await request.json();

        // Validation
        if (!prompt || !tag) {
            return new Response(JSON.stringify({ error: "Missing required fields: prompt, tag" }), { status: 400 });
        }

        if (prompt.length === 0 || prompt.length > 2000) {
            return new Response(JSON.stringify({ error: "Prompt must be between 1 and 2000 characters" }), { status: 400 });
        }

        if (!/^#[a-zA-Z0-9]+$/.test(tag)) {
            return new Response(JSON.stringify({ error: "Tag must start with # and contain only letters/numbers" }), { status: 400 });
        }

        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify({ message: "Prompt updated successfully", prompt: existingPrompt }), { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return new Response(JSON.stringify({ error: "Failed to update prompt", details: error.message }), { status: 500 });
    }
};


// DELETE (delete)
export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();

        // Find the prompt by ID and remove it
        const deletedPrompt = await Prompt.findByIdAndDelete(params.id);

        if (!deletedPrompt) {
            return new Response(JSON.stringify({ error: "Prompt not found" }), { status: 404 });
        }

        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return new Response(JSON.stringify({ error: "Failed to delete prompt", details: error.message }), { status: 500 });
    }
};
