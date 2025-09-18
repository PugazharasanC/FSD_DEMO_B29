import { model, Schema } from "mongoose";

import bcrypt from "bcryptjs";

const userSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minlength: 3,
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email ID is required for registeration"],
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be atleast 6 characters"],
      select: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Manager", "Employee", "Viewer"],
      default: "Viewer",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  try {
    return await bcrypt.compare(userPassword, this.password);
  } catch (err) {
    console.error(err);
  }
};

const User = model("User", userSchema);
export default User;

// {
//   name: String,
//   email: String,
//   password: String (hashed),
//   role: String (Admin | Manager | Employee | Viewer)
// }
