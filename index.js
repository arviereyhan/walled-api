const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routers/users.router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors())

app.use(userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




