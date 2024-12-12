const transactionService = require("../services/transactions.services");

const getTransactionById = async (req, res) => {
    try {
      const { user_id } = req.user;
      const user = await transactionService.getTransactionById(Number(user_id)); 
      res.status(200).json({ data: user });
    } catch (error) {
      if (error.message === "user not found") {
        return res.status(404).json({ error: error.message });
      }
      res.status(error.statusCode || 500).json({ error: error.message });
    }
  };

  const createTransactions = async (req, res) => {
    try {
      const user = await transactionService.createTransactions(req.body);
      console.log(user)
      res.status(201).json({ data: user[0]});
    } catch (error) {
      res.status(error.statusCode || 500).json({ error: error.message, });
    }
  };

  module.exports = { getTransactionById, createTransactions };