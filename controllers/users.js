const user = require("../models/users");
const bcrypt = require("bcrypt");
const { generateToken } = require("./utils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw "Please fill out all fields";

    const existingUser = await user.findOne({ email });
    if (!existingUser) throw "No email found";

    const comparePass = bcrypt.compare(password, existingUser.password);
    if (!comparePass) throw "Invalid credentials";

    delete existingUser.password;
    const token = await generateToken({ email });
    return res
      .status(200)
      .json({ msg: "login successful", user:existingUser, token });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ msg: "Login failed!", error });
  }
};

const signUp = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) throw "Incomplete details";

    const existingUser = await user.findOne({ email });
    if (existingUser) throw "user already exists";

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await user.create({
      email,
      username,
      password: hashedPass,
    });
    delete user.password;
    const token = await generateToken({ email });
    return res.status(200).json({ msg: "signUp Successful", user:newUser, token });
  } catch (error) {
    return res.status(400).json({ msg: "Signup failed", error });
  }
};

module.exports = {login, signUp};
