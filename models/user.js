import { Schema, model } from "mongoose";
const userSchema = Schema({
    email: String,
    userName:String,   
    password:String,
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    registerDate: { type: Date, default: Date.now() },
})
const userModel = model("user", userSchema);
export default userModel;
