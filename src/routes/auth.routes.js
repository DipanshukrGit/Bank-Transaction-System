const express =require("express")
const userRegisterController = require("../controllers/auth.controllers")



const router=express.Router()
//  /api/auth/register
router.post("/register",userRegisterController)




module.exports=router