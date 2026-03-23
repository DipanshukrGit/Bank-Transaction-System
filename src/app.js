const express = require('express');
const app = express();


// Route
app.get('/', (req, res) => {
  res.send('Hello, Expresss!');
});




module.exports=app