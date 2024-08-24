const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let users = new Map(); // Change from array to Map for efficient lookups

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const isValidPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.SECRET_KEY, { expiresIn: process.env.TOKEN_EXPIRATION || '1h' });
};

const registerUser = async (username, password) => {
  const hashedPassword = await hashPassword(password);
  // Using `size` of a Map ensures unique ID generation when combined with proper UUIDs in real-world scenarios
  const newUser = { id: users.size + 1, username, password: hashedPassword };
  users.set(username, newUser); // Store user by username for O(1) access
  return newUser;
};

const loginUser = async (username, password) => {
  const user = users.get(username); // More efficient user retrieval
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
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new Error('Invalid token');
  }
};

module.exports = { registerUser, loginUser, validateSession };