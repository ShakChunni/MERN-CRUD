const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://ashfaq1:ashfaq@simple-project.km5b5xe.mongodb.net/simple-projectX"
);

app.post("/signup", async (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
