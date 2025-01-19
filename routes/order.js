import {Router} from "express"
import {add,deleteById,getAll,getUserOrder,updateByIdDeliveryStarted} from "../controller/order.js"

const router=Router();
router.get("/",getAll);
router.post("/",add);
router.delete("/:id",deleteById);//צריך לשנות
router.get("/user/:codeUser",getUserOrder);
router.put("/:id",updateByIdDeliveryStarted);


export default router;
//  שליפת כל ההזמנות
//  הוספת הזמנה – (קבעי מה יהיו שדות חובה ובדיקות תקינות)
//  מחיקת הזמנה – שולח קוד הזמנה ,רק אם ההזמנה לא יצאה לדרך,
//  שליפת כל ההזמנות של משתמש מסויים
//  עדכון הזמנה שבוצעה (שיצאה לדרך). מקבלת קוד הזמנה ומעדכנת את השדה יצאה לדרך.