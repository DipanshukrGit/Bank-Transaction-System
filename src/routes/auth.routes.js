const express =require("express")
const userRegisterController = require("../controllers/auth.controllers")
const userLoginController = require("../controllers/auth.controllers")



const router=express.Router()
//  /api/auth/register
router.post("/register",userRegisterController)

//  /api/auth/login
router.post("/login",userLoginController)



module.exports=router