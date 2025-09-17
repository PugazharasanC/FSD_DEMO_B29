import User from "../model/User.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find();
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
