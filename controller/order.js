import orderModel from "../models/order.js";
import mongoose from "mongoose";
import userModel from "../models/user.js";

export const getAll = async (req, res) => {
    try {
        let data = await orderModel.find();
        res.json(data)
    } catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export async function getUserOrder(req, res) {
    let { codeUser } = req.params;
    if (!mongoose.isValidObjectId(codeUser))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    try {
        let user = await userModel.findById(codeUser)
        if (!user)
            return res.status(404).json({ title: "worng id", message: "no user with such id found" })
        let allOrdes = await orderModel.find(codeUser)
        res.json(allOrdes);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export function deleteById(req, res) {
    let { id } = req.params;
    orderModel.findById(id)
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no product with such id found" })
            if (data.deliveryStarted)
                return res.status(404).json({ title: "worng id", message: "no product with such id found" })
            orderModel.deleteById(id).then(data => res.json(data))
        })

        .catch(err => {
            return res.status(400).json({ title: "cannot delete by id", message: err.message })
        })
}

export function updateByIdDeliveryStarted(req, res) {
    const { id } = req.params;
    const{deliveryStarted}=req.body;

    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    productModel.findByIdAndUpdate(id, deliveryStarted, { new: true })
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no product with such id found" })
            res.json(data)
        })
        .catch(err => { return res.status(400).json({ title: "cannot update by id", message: err.message }) })
}

export const add = async (req, res) => {
    try {
        let { codeUser, orderProducts, targetAddress, deliveryPrice, finalPrice } = req.body;

        // בדיקה שהשדות החיוניים קיימים
        if (!codeUser || !orderProducts || orderProducts.length === 0) {
            return res.status(404).json({
                title: "missing required details",
                message: "codeUser and orderProducts are required"
            });
        }

        // יצירת אובייקט הזמנה חדש
        let newOrder = new orderModel({
            codeUser: codeUser,
            orderProducts: orderProducts,
            targetAddress: targetAddress,
            deliveryPrice: deliveryPrice,
            finalPrice: finalPrice,
        });

        // שמירת ההזמנה בדאטהבייס
        await newOrder.save();

        // החזרת ההזמנה שנוצרה
        return res.json(newOrder);
    } catch (err) {
        res.status(400).json({ title: "error cannot add order", message: err.message });
    }
};




 


