//imports
const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors");
const helmet = require("helmet");
const cors = require("cors");
const corsOptions = require("./corsOptions");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const movies_routes = require("./routes/moviesRoute");
const auth_routes = require("./routes/authRoute");
const type_routes = require("./routes/typeRoute");
const language_route = require("./routes/languageRoute");
const genre_route = require("./routes/genreRoute");
const actors_route = require("./routes/actorsRoute");
const connectDB = require("./db/database");
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

//depedencies
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public/images")));
app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

//manual method to allow vue to set backend cookies intead of using cors package
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });
//routes
app.use("/api/auth", auth_routes);
app.use("/api/movies", movies_routes);
app.use("/api/types", type_routes);
app.use("/api/languages", language_route);
app.use("/api/genres", genre_route);
app.use("/api/actors", actors_route);
app.use(notFound);
app.use(errorHandlerMiddleware);

//server config
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(
      process.env.MONGO_URI,
      console.log("Database Connected Successfully!")
    );
    app.listen(port, () => {
      console.log(`Server is listening in Port ${port} `);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
