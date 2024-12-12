const Joi = require("joi");
const userRepository = require("../repositories/users.repository");

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.user_email);
  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }
  user = await userRepository.createUsers(userData);
  return user;
};

const getUsers = async (userData) => {
    let user = await userRepository.getUsers(userData)
    return user;
  };


module.exports = { createUser, getUsers };