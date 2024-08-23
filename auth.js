const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let users = [];

const SECRET_KEY = process.env.SECRET_KEY;
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || '1h';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const isValidPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: TOKEN_EXPIRATION });
};

const registerUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  const newUser = { id: users.length + 1, username, password: hashedPassword };
  users.push(newUser);
  return newUser;
};

const loginUser = async (username, password) => {
  const user = users.find(user => user.username === username);
  if (!user) {
    throw new Error('User not found');
  }
  const isPasswordValid = await isValidPassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }
  const token = generateToken(user.id);
  return { user, token };
};

const validateSession = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = { registerUser, loginUser, validateSession };