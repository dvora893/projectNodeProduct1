import express from "express";
import routerOrder from "./routes/order.js";
import routerUser from "./routes/user.js";
import routerProduct from "./routes/product.js";
import { connectToDb } from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
connectToDb();
app.use(express.json())
app.use('/api/user', routerUser);
app.use('/api/order', routerOrder);
app.use('/api/product', routerProduct);

let port =process.env.PORT ;
app.listen(port, () => {
    console.log("app is listening on port " + port);
})


