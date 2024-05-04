import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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
        isActive: {
            type: Boolean,
            default: true
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
