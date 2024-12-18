const pool = require("../db/db");

const findTransactionById = async (id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions where user_id = $1",
      [id]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createTransactions = async (transaction) => {
  try {
    const { date, type, source, description, amount, user_id } = transaction;
    const result = await pool.query(
      "INSERT INTO transactions (date, type, source, description, amount, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, type, source, description, amount, user_id]
    );
    return result.rows;
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const createTransfer = async (transaction) => {
  try {
    const { source, description, amount, user_id } = transaction;

    // Validasi user_id
    const userValidation = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [user_id]
    );

    if (userValidation.rows.length === 0) {
      throw new Error("Users not found");
    }

    // Validasi source
    const sourceValidation = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [source]
    );

    if (sourceValidation.rows.length === 0) {
      throw new Error("Users not found");
    }

    // Lanjutkan operasi jika validasi berhasil
    await pool.query(
      "UPDATE users SET user_balance = user_balance - $1 WHERE user_id = $2",
      [amount, user_id]
    );

    await pool.query(
      "UPDATE users SET user_balance = user_balance + $1 WHERE user_id = $2",
      [amount, source]
    );

    const date = Date.now();
    const debit = "DEBIT";
    const credit = "CREDIT";

    await pool.query(
      "INSERT INTO transactions (date, type, source, description, amount, user_id) VALUES ($1, $2, $3, $4, $5, $6)",
      [date, credit, user_id, description, amount, source]
    );

    const result = await pool.query(
      "INSERT INTO transactions (date, type, source, description, amount, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, debit, source, description, amount, user_id]
    );

    return result.rows;
  } catch (error) {
    console.error("Error:", error.message);
    if (error.message.includes("not found")) {
      throw new Error(error.message);
    }
    throw new Error("Database error occurred while processing the transfer.");
  }
};


const createTopup = async (transaction) => {
  try {
    const { source, description, amount, user_id } = transaction;
    const userValidation = await pool.query(
      "SELECT * FROM users where user_id = $1",
      [user_id]
    );

    if (userValidation.rows.length == 0) {
      throw new Error("Users not found");
    }

    await pool.query(
      "UPDATE users SET user_balance = user_balance + $1 WHERE user_id = $2",
      [amount, user_id]
    );
    const date =  Date.now();
    const credit = "CREDIT"

    
    const result = await pool.query(
      "INSERT INTO transactions (date, type, source, description, amount, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date, credit, source, description, amount, user_id]
    );
    return result.rows;
  } catch (error) {
    console.log(error, "error apa")
    throw new Error("Database error occurred while creating the user.");
  }
};

module.exports = { findTransactionById, createTransactions, createTransfer, createTopup };
