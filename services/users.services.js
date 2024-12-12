const bcrypt = require("bcrypt");
const userRepository = require("../repositories/users.repository");

const createUser = async (userData) => {
  let user = await userRepository.findUserByEmail(userData.user_email);
  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.user_password, salt);
  const newUser = { ...userData, user_password: hashedPassword };
  user = await userRepository.createUsers(newUser);
  return user;
};

const getUsers = async (userData) => {  
  let user = await userRepository.getUsers(userData);
  return user;
};

const login = async (userData) => {
    let user = await userRepository.findUserByEmail(userData.user_email);
    if (user.rows.length === 0) {
      throw new Error("user does not exist");
    }
    const isValid = await bcrypt.compare(userData.user_password, user.rows[0].user_password)   
    return isValid;
  };

module.exports = { createUser, getUsers, login };
