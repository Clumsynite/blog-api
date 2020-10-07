require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const routes = require("./routes");
const jwt = require("jsonwebtoken");
const app = express();

require("./passport");

require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
const MongoStore = require("connect-mongo")(session);
const connection = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const sessionStore = new MongoStore({
  mongooseConnection: connection,
  collection: "sessions",
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

async function verifyToken(req, res, next) {
  try {
    const token = req.cookies.auth;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user_data = decoded;
    next();
  } catch (error) {
    return res.status(403).send("Error");
  }
}

app.use("/auth", routes.auth);
app.use("/user", verifyToken, routes.user);
app.use("/blog", verifyToken, routes.blog);
app.use("/comment", verifyToken, routes.comment);

app.listen(process.env.PORT, () =>
  console.log(
    `App listening on Port ${process.env.PORT}\nhttp://localhost:${process.env.PORT}`
  )
);
