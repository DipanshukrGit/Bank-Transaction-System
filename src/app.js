const express = require('express');
const cookieParser=require("cookie-parser")
const app = express();
const authRoutes=require("./routes/auth.routes")
const accountRouter=require("./routes/account.routes")
const transactionRoutes = require("./routes/transaction.routes")

app.use(express.json()) // by default express incoming request body ka JSON data directly nahi samajhta, isliye ye middleware use karte hain jo JSON data ko read karke req.body me convert kar deta hai

app.use(cookieParser());



// user Route
app.get('/', (req, res) => {
  res.send('Hello, Expresss!');
});

app.use("/api/auth",authRoutes)
app.use("/api/account",accountRouter)
app.use("/api/transactions", transactionRoutes)



module.exports=app