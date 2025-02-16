const User = require("../models/user.models.js");
const bcrypt = require("bcryptjs");
const createAccessToken = require("../libs/jwt.js");
const jwt = require("jsonwebtoken"); // se hace antes de usar la carpeta libs
const TOKEN_SECRET = require("../config.js");

const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["the email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSave = await newUser.save();

    const token = await createAccessToken({ id: userSave._id });

    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      createdAt: userSave.createdAt,
      updatedAt: userSave.updatedAt,
      message: "user created successfully",
    });
    // jwt.sign(  //se exporto a la carpeta libs

    //   {
    //     id: userSave._id,
    //   },
    //   "secret123",
    //   {
    //     expiresIn: "1d",
    //   },
    //   (err, token) => {
    //     if (err) console.log(err);
    //     // res.cookie("token", token);
    //     // res.json({
    //     //   message: "User created successfully",
    //     // }); // esto es para pruebas de la api
    //   }
    // );

    // res.json({
    //   id: userSave._id,
    //   username: userSave.username,
    //   email: userSave.email,
    //   createdAt: userSave.createdAt,
    //   updatedAt: userSave.updatedAt,
    // });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) return res.status(400).json(["User not found"]);

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) return res.status(400).json(["password incorrect"]);

    const token = await createAccessToken({ id: userFound._id });

    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });

  return res.sendStatus(200);
};

const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);

  if (!userFound) return res.status(401).json({ message: "user not found" });

  return res.status(200).json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updateAt: userFound.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

module.exports = { register, login, logout, profile, verifyToken };
