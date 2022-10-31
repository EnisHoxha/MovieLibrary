const express = require("express");
const app = express();
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const movies_routes = require("./routes/moviesRoute");
const connectDB = require("./db/database");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public/images")));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use("/api/movies", movies_routes);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URI,
      console.log("Database Connected Successfully!")
    );
    app.listen(port, () => {
      console.log(`Server is listening in Port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
