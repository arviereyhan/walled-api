const transactionRepository = require("../repositories/transactions.repository.js");

const createTransactions = async (userData) => {
    let user = await transactionRepository.createTransactions(userData);
    return user;
  };

  const getTransactionById = async (id) => {
    console.log(id, "id")
    let user = await transactionRepository.findTransactionById(id);
    if (!user) {
      throw new Error("user not found");
    }
    return user;
  };


  module.exports = {getTransactionById, createTransactions };