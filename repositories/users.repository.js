const pool = require("../db/db");

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users where user_email = $1",
      [email]
    );
    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findUserById = async (id) => {
    try {
        console.log(id, " id id")
      const result = await pool.query("SELECT * FROM users where user_id = $1", [id]);
      return result.rows[0];
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };



const createUsers = async (user) => {
  try {
    const { user_name, user_email, user_number, user_password } = user;
    const result = await pool.query(
      "INSERT INTO users (user_name, user_email, user_number, user_password) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_name, user_email, user_number, user_password]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};


const getUsers = async () => {
    try {
       const result = await pool.query("SELECT * FROM users")
       return result.rows;
    } catch (error) {
        throw new Error("Database error occurred while creating the user.");
    }
  };

module.exports = { createUsers, findUserByEmail, getUsers, findUserById };
