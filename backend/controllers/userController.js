import asyncHandler from "express-async-handler";
import generateToken from "../utils/genertateToken.js";
import User from "../models/userModel.js";

// @desc     Auth the user
// @route    GET /api/users/login
// @access   Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isBlackListed: user.isBlackListed,
      token: generateToken(user._id),
    });
  } else if (user.isBlackListed) {
    res.status(403);
    throw new Error("User is BlackListed");
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc     Register a new user
// @route    POST /api/users
// @access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc     Get user profile
// @route    GET /api/users/profile
// @access   private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     update user profile
// @route    put /api/users/profile
// @access   private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc     Get all users
// @route    GET /api/users/
// @access   private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});

  try {
    res.json(users);
  } catch (error) {
    res.status(400);
    throw new Error("There are no user ? Then how did you get your token?");
  }
});

// @desc     Delete user
// @route    DELETE api/user/:id
// @access   private/admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User is removed" });
  } else {
    res.status(404);
    throw new Error("No User Found To Delete");
  }
});

// @desc     Get user by id
// @route    GET /api/users/:id
// @access   private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
});

// @desc     update user
// @route    put /api/users/:id
// @access   private/admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    user.isBlackListed = req.body.isBlackListed;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
