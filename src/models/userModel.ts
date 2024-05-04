import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: [true, "Please provide a login"],
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
        },
        role: {
            type: String,
            required: [true, "Please provide a password"],
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
