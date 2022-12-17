import  express  from "express";
import { getUsers,Register } from "../controlers/Users.js";






const router = express.Router();



router.get('/users',getUsers);
router.post('/users',Register);
router.get('/',(req,res)=>{
    res.send("BE REST");
})



export default router;