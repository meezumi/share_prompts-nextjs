import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        // Get pagination parameters from query string
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const skip = (page - 1) * limit;

        // Fetch paginated prompts
        const prompts = await Prompt.find({})
            .populate("creator")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Get total count for pagination info
        const total = await Prompt.countDocuments({});

        return new Response(JSON.stringify({ 
            prompts, 
            total,
            page,
            limit,
            pages: Math.ceil(total / limit)
        }), { status: 200 })
    } catch (error) {
        console.error("Error fetching prompts:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch prompts", details: error.message }), { status: 500 })
    }
} 