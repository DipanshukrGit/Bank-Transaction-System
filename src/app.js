const express = require('express');
const cookieParser=require("cookie-parser")
const app = express();

const authRoutes=require("./routes/auth.routes")

app.use(express.json()) // by default express incoming request body ka JSON data directly nahi samajhta, isliye ye middleware use karte hain jo JSON data ko read karke req.body me convert kar deta hai

app.use(cookieParser)
// Route
app.use("/api/auth",authRoutes)

app.get('/', (req, res) => {
  res.send('Hello, Expresss!');
});




module.exports=app