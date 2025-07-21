const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      minLength: 6,
      maxLength: 20,
      required: true,
    },
    photoUrl: {
      type: String,
      default: "https://www.gravatar.com/avatar/",
    },
    native: {
      type: String,
      enum: ["English", "Hindi", "French", "Spanish"],
      required: false
    },
    learning: {
      type: String,
      enum: ["English", "Hindi", "French", "Spanish"],
      required: false
    },
    profileCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
