import mongoose from "mongoose";

const chefSchema = new mongoose.Schema(
    {
        orders: [
            {
                photo: {
                    type: String,
                    required: [true, "Please provide a photo"],
                },
                name: {
                    type: String,
                    required: [true, "Please provide a name"],
                },
                price: {
                    type: String,
                    required: [true, "Please provide a price"],
                },
                category: {
                    type: String,
                    required: [true, "Please provide a category"],
                },
                count: {
                    type: String,
                    required: [true, "Please provide a count"],
                },
            }
        ],
        orderNumber: {
            type: String,
            required: [true, "Please provide a orderNumber"],
        },
        isFinished: {
            type: Boolean,
            default: false
        },
        isActive: {
            type: Boolean,
            default: true
        },

    },
    {
        timestamps: true,
    }
);

const Chef = mongoose.models.Chef || mongoose.model("Chef", chefSchema);

export default Chef;
