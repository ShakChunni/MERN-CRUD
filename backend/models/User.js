const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    default: "", // Set default value to an empty string
  },
  interests: [
    {
      type: String,
      default: [], // Set default value to an empty array
    },
  ],
  bio: {
    type: String,
    maxlength: 50,
    default: "", // Set default value to an empty string
  },
});

const UserModel = mongoose.model("extrordinary", UserSchema);
module.exports = UserModel;
