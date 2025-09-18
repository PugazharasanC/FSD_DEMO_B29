import User from "../model/User.js";
import sendEmail from "../utils/sendEmail.js";

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body; // Admin filled data
  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User Already Exists",
    });
  }

  const newUser = await User.create({
    name,
    email,
    password: password || "Password123",
    role,
  });

  sendEmail({
    to: email,
    subject: "Welcome Mail from TTM",
    text: `Hello ${name},
    Welcome to Team Task Manager, here is your account details
    Email : ${email}
    Password : ${password || "Password123"},
    Role : ${newUser.role}
    `,
  });

  res.status(201).json({
    status: "success",
    message: "User Created Successfully",
  });
};

export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-email");
  res.status(200).json({
    status: "success",
    message: "Users Fetched Successfully",
    users,
  });
};

export const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findById(id);
  user.role = role;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "User Updated Successfully",
    user,
  });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User Not Found",
    });
  }
  res.status(200).json({
    status: "success",
    message: "User Deleted Successfully",
    user,
  });
};
