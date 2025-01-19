import {Router} from "express"
import {add,deleteById,getAll,getById,updateById,updatePassword,login} from "../controller/user.js"


const router=Router();
router.post("/",add);
router.get("/:id",getById);
router.get("/",getAll);
router.delete("/:id",deleteById);
router.put("/:id",updateById);
router.put("/:id/password", updatePassword);
router.post("/login/password", login);

export default router;
