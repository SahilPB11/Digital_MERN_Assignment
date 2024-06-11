import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendCookie from "../utils/send_Cookie.js";

// emailValidationMiddleware.js
const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const signup = async (req, res, next) => {
  // Check if email is valid
  const { email, password } = req.body;

  // Check if email is valid
  if (!validateEmail(email)) {
    return next(new ErrorHandler("Invalid email address", 400));
  }

  try {
    const user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User already exists", 409));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser = new User({ email, password: hashedPassword });
    newUser = await newUser.save();
    // calling function for send the response from utils
    sendCookie(res, newUser, 201, "Registerd Succesfully");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
    sendCookie(res, user, 200, "Login Succesfully");
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
};
