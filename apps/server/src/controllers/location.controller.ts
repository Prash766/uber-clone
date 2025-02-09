import axios from "axios";
import asyncHandler from "../utils/asyncHandler";

const searchPlacesList = asyncHandler(async (req, res) => {
    try {
        const { queryPlace } = req.body;
                if (!queryPlace) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }
        const response = await axios.get(`${process.env.SEARCH_PLACES_API}`, {
            params: {
                q: queryPlace,
                format: 'json'
            }
        });

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error: any) {
        console.error('Search Places Error:', error);
                if (error.response) {
            return res.status(error.response.status).json({
                success: false,
                message: error.response.data.message || "API request failed"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
});

export {
    searchPlacesList
};