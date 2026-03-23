const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB is connected");
    })
    .catch((err) => {
      console.log("Error in DB connection:", err.message);
      process.exit(1);  
    });
}

module.exports = connectToDB; 