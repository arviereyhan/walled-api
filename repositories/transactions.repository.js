const pool = require("../db/db");

const findTransactionById = async (id) => {
    try {
      const result = await pool.query("SELECT * FROM transactions where user_id = $1", [id]);
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

  module.exports = { findTransactionById, createTransactions };