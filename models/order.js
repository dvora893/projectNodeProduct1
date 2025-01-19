import { Schema, model } from "mongoose";
import productModel from "./product.js";
//מקשר לדאטה בייס מתקשר איתו
const minimalProduct = Schema({
    nameproduct: String,
    imag: String,
    price: Number,
    expirationDate: { type: Date, default: new Date() },
    component: [String],
    sugar: { type: String, default: "withSugar", enum: ["withSugar", "noSugar"] },
    count: Number
})

const orderSchema = Schema({

    date: { type: Date, default: new Date() },
    targetDate: { type: Date, default: new Date() },
    targetAddress: String,
    // codeUser: String,
    codeUser: { type: Schema.Types.ObjectId, ref: "user", required: true }, // הפניה למשתמש המזמין
    orderProducts: [minimalProduct],
    deliveryStarted: { type: Boolean, default: false },
    deliveryPrice: { type: Number, min: 0 },
    finalPrice: { type: Number, min: 0 },



})
const orderModel = model("order", orderSchema);
export default orderModel;

