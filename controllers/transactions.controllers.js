const transactionService = require("../services/transactions.services");

const getTransactionById = async (req, res) => {
  try {
    const prefix = "60001";
    const { user_id } = req.user;
    const user = await transactionService.getTransactionById(Number(user_id));
    function containsNumber(str) {
      // Menggunakan regex \d untuk mendeteksi digit
      return /\d/.test(str);
    }
    const updatedUser = user.map((u) => {
        console.log(typeof(u.source))
        if (containsNumber(u.source)){
          return u.source = `${prefix}${u.source}`
        } else {
          return u.source
        }
    })
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
    console.log(user);
    res.status(201).json({ data: user[0] });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createTransfer = async (req, res) => {
  try {
    const transaction = await transactionService.createTransfer(req.body);
    console.log(transaction);
    res.status(201).json({ data: transaction[0] });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createTopup = async (req, res) => {
  try {
    const transaction = await transactionService.createTopup(req.body);
    console.log(transaction);
    res.status(201).json({ data: transaction[0] });
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};
module.exports = { getTransactionById, createTransactions, createTransfer, createTopup };
