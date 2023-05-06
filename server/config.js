const e = require("express");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb+srv://arnav:arnav0710@cluster0.yphzfjk.mongodb.net/mydb?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log("Connected")).catch((err) => console.log("error" + err));
//export
module.exports = db;
