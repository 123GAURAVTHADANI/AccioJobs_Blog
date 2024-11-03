const { Schema, default: mongoose } = require("mongoose");
var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Kindly Input the First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Kindly Input the Last Name"],
    },
    email: {
      type: String,
      required: [true, "Kindly input the Email as well!"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
      required: true,
    },
    blog: [
      {
        type: Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
    role: {
      type: String,
      enum: ["SUPER ADMIN", "ADMIN", "USER"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods = {
  comparePassword: async function (plainPassword) {
    return await bcrypt.compare(plainPassword, this.password);
  },

  generateJWTToken: async function () {
    return await jwt.sign(
      { id: this._id, role: this.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    );
  },
};

const User = mongoose.model("User", userSchema);
module.exports = User;
