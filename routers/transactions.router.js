const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactions.controllers");
const authenticateToken = require("../middlewares/auth.middleware");

router.get("/transaction", authenticateToken, transactionController.getTransactionById);
router.post("/createtransaction", transactionController.createTransactions);
router.post("/createtransfer", transactionController.createTransfer, authenticateToken);
router.post("/createtopup", transactionController.createTopup, authenticateToken);

module.exports = router;