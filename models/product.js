import { Schema, model } from "mongoose";
const productSchema = Schema({
    nameproduct: String,
    description: String,
    creationDate: { type: Date, default: new Date() },
    imag: String,
    price: Number,
    sugarLevel: Number,
    expirationDate: { type: Date, default: new Date() },
    component: [String],
    
    sugar: { type: String, default: "withSugar", enum: ["withSugar", "noSugar"] },

})
const productModel = model("product", productSchema);
export default productModel;