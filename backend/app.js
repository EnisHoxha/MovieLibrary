const express = require("express");
const app = express();
require("dotenv").config();
const movies_routes = require("./routes/index");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(express.json());
// app.use(express.static("./public"));
app.use("/api/movies", movies_routes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    app.listen(port, () => {
      console.log(`Server is listening in Port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
