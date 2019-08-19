const express = require("express");
const index = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

index.use(bodyParser.urlencoded({ extented: false }));
index.use(bodyParser.json());

//passport middleware
index.use(passport.initialize());
//passport config
require("./config/passport")(passport);

index.use("/api/users", users);
index.use("/api/profile", profile);
index.use("/api/posts", posts);

//server static assets if in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  index.use(express.static("client/build"));

  index.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

mongoose.connect("mongodb://localhost/Devconnector");
var db = mongoose.connection;
// index.get("/", (req, res) => res.send("hello world!"));

db.once("open", function() {
  console.log("db connected");
});
db.on("error", function(err) {
  console.log(err);
});
const port = process.env.PORT || 5000;
index.listen(port, () => console.log("server is runnning ${port}"));
// index.listen(3000, function() {
//   console.log("server stARTED");
// });
