const bcrypt = require('bcryptjs');
const userRepository = require("../repositories/users.repository");
const { generateAccessToken } = require("../utils/auth.util");


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
      throw new Error("404");
    }
    const isPasswordMatched = await bcrypt.compare(userData.user_password, user.rows[0].user_password)   

    if (!isPasswordMatched){
        throw new Error("401")
    }
    const token = generateAccessToken({ user_email : userData.user_email, user_id: user.rows[0].user_id });

    return token;
  };

  const getUserById = async (id) => {
    console.log(id, "id")
    let user = await userRepository.findUserById(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  };


module.exports = { createUser, getUsers, login, getUserById };
