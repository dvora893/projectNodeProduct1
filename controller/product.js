import productModel from "../models/product.js";
import mongoose from "mongoose";

//let arr = [{ id: 1, kind: "wedding", price: 10000 }];

export const getAll = async (req, res) => {
    try {
        let data = await productModel.find()
        res.json(data)
    } catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export function getById(req, res) {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    try {
        let data = productModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "worng id", message: "no even with such id found" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export function deleteById(req, res) {
    let { id } = req.params;
    productModel.findByIdAndDelete(id)
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no product with such id found" })
            res.json(data);
        }).catch(err => {
            return res.status(400).json({ title: "cannot delete by id", message: err.message })
        })
}

export function updateById(req, res) {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    productModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no product with such id found" })
            res.json(data)
        })
        .catch(err => { return res.status(400).json({ title: "cannot update by id", message: err.message }) })
}

export const add = async (req, res) => {
    let { body } = req;
    if (!body.price || !body.nameproduct)
        return res.status(404).json({ title: "cannot add product", message: "name , price are require" })
    try {
        let newProduct = new productModel(body);
        await newProduct.save();
        res.json(newProduct);
    }
    catch (err) {
        console.log(err)
        res.status(400).json({ title: "cannot add this product", message: err.message })
    }



}