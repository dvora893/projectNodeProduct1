
import userModel from "../models/user.js";
import mongoose from "mongoose";

//let arr = [{ id: 1, kind: "wedding", price: 10000 }];

export const getAll = async (req, res) => {
    try {
        let data = await userModel.find();
        
        // יצירת מערך חדש ללא שדה הסיסמה
        let filteredData = data.map(({ password, ...rest }) => rest);

        res.json(filteredData);
    } catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message });
    }
};

export function getById(req, res) {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    try {
        let data = userModel.findById(id)
        if (!data)
            return res.status(404).json({ title: "worng id", message: "no user with such id found" })
        
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

export function deleteById(req, res) {
    let { id } = req.params;
    userModel.findByIdAndDelete(id)
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no user with such id found" })
            res.json(data);
        }).catch(err => {
            return res.status(400).json({ title: "cannot delete by id", message: err.message })
        })
}

export function updateById(req, res) {
    const { id } = req.params;
    const { password, ...updateFields } = req.body;
    if (password) {
        return res.status(400).json({ title: "Invalid update", message: "Password cannot be updated using this endpoint" });
    }
    if (!mongoose.isValidObjectId(id))
        return res.status(400).json({ title: "id not valid", message: "id is not in correct format" })
    userModel.findByIdAndUpdate(id, updateFields, { new: true })
        .then(data => {
            if (!data)
                return res.status(404).json({ title: "worng id", message: "no user with such id found" })
            res.json(data)
        })
        .catch(err => { return res.status(400).json({ title: "cannot update by id", message: err.message }) })
}

export const add = async (req, res) => {
    if ( !req.body.email || !req.body.userName || !req.body.password)
        return res.status(404).json({ title: "missing data", message: "missing data" })



    try {

        let newUser = new userModel(req.body)
        let data = await newUser.save();


        res.json(data);
    } catch (err) {
        console.log("err");
        res.status(400).json({ title: "error cannot add ", message: err.message })
    }
}



// עדכון סיסמת משתמש
export const updatePassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ title: "Invalid ID", message: "ID format is not valid" });
    }
    if (!password) {
        return res.status(404).json({ title: "Missing password", message: "Password is required" });
    }
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, password, { new: true })
        if (!updatedUser) {
            return res.status(404).json({ title: "User not found", message: "No user with such ID" });
        }
        res.json(updatedUser);
    } catch (err) {
        return res.status(400).json({ title: "Error updating password", message: err.message });
    }
};

export const login = async (req, res) => {
    const { userName, password } = req.body;
    if (!userName || !password) {
        return res.status(400).json({ title: "Missing credentials", message: "Username and password are required" });
    }
    try {
        const user = await userModel.findOne({ userName, password });
        if (!user) {
            return res.status(401).json({ title: "Login failed", message: "Invalid username or password" });
        }
        res.json(user);
    } catch (err) {
        return res.status(400).json({ title: "Error logging in", message: err.message });
    }
};


