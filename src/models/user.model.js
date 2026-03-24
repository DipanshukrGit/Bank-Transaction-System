const mongoose = require("mongoose");
const bcrypt=require("bcrypt")

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required for creating a user"],
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email"
    ],
    unique:[true,"email already exist"]
  },

  name:{
     type:String,
      required: [true, "name is required"]

  },
  password:{
     type:String,
      required: [true, "please enter the password"],
      minlength:[6,"password should be greater then 6 "],
      select:false //bydefault password nahi layega kisi query mein
  }
},{
    timestamps:true
});

// userSchema.pre(...) → ye middleware / hook hai
// "save" → jab bhi user document save hoga, usse pehle ye code chalega
// async function(next) → ye async function hai, aur next() bolta hai ki ab agla step chalao


userSchema.pre("save", async function() {

    if(!this.isModified("password")){
        return;
    }

    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    
})


//compare 

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};




const userModel = mongoose.model("User", userSchema);
module.exports = userModel;