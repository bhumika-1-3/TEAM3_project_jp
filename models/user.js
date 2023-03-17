// Importing modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
        "Invalid email address!",
      ],
    },

    phone: {
      type: Number,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password too short!"],
      maxlength: [128, "Password too long!"],
    },

    gender: {
      type: String,
      trim: true,
      enum: ["male", "female", "other"],
    },
    age: {
      type: Number,
      trim: true,
    },

    queries: [
      {
        location: {
          type: String,
          trim: true,
        },
        startDate: {
          type: String,
          trim: true,
        },
        endDate: {
          type: String,
          trim: true,
        },
        adults: {
          type: Number,
          trim: true,
        },
        children: {
          type: Number,
          trim: true,
        },
        budget: {
          type: String,
          trim: true,
        },
      },
    ],
    
    otp: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
    },

    verified: {
      phone: {
        type: Boolean,
        default: false,
      },
      email: {
        type: Boolean,
        default: false,
      },
    },

    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// Hashing the password
userSchema.pre("save", async function (next) {
  let currentUser = this;
  if (!currentUser.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    currentUser.password = await bcrypt.hash(currentUser.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Generating jwt
userSchema.statics.generatejwt = async (userid) => {
  const user = await User.findById(userid);
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

const User = mongoose.model("User", userSchema);

// Exporting the module
module.exports = User;
