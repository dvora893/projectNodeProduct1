import {Router} from "express"
import {add,deleteById,getAll,getById,updateById} from "../controller/product.js"

const router=Router();
router.get("/",getAll);
router.get("/:id",getById);
router.post("/",add);
router.delete("/:id",deleteById);
router.put("/:id",updateById);


export default router;