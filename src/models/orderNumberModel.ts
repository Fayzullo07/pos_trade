import mongoose from "mongoose";

const orderNumberSchema = new mongoose.Schema(
    {
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

const OrderNumber = mongoose.models.OrderNumber || mongoose.model("OrderNumber", orderNumberSchema);

export default OrderNumber;
