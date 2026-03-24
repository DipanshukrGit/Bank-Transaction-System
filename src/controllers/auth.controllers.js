const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")


/**
* - user register controller
* - POST /api/auth/register
*/

async function userRegisterController(req, res) {
    const { email, password, name } = req.body

    const isExists = await userModel.findOne({
        email: email
    })

    if (isExists) {
        return res.status(422).json({
            message: "user already exist with this email",
            status: "failed"
        })
    }

    const user=await userModel.create({
        email,password,name
    })

    const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: "3d" })
    res.cookie("token",token)
    res.status(201).json({
          user:{ 
            _id:user._id,
            email:user.email,
            name:user.name
          },
          token
        })


}
module.exports=userRegisterController;




/**
 * - User Login Controller
 * - POST /api/auth/login
  */

async function userLoginController(req,res){
  const {email,password}=req.body
  const user=await userModel.findOne({email}).select("+password")  //select isliye hai kyu ki user model mein humne false rakha hai
  if (!user) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Email or password is INVALID"
        })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" })

    res.cookie("token", token)

    res.status(200).json({
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

}
module.exports=userLoginController;

/**
 * - User Logout Controller
 * - POST /api/auth/logout
  */


async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[ 1 ]

    if (!token) {
        return res.status(200).json({
            message: "User logged out successfully"
        })
    }



    await tokenBlackListModel.create({
        token: token
    })

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })

}
module.exports=userLogoutController;

