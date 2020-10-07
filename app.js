require("dotenv").config();
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const router = require("./routes");

const app = express();

require("./passport");

require("./db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/", router);

app.listen(process.env.PORT, () =>
  console.log(
    `App listening on Port ${process.env.PORT}\nhttp://localhost:${process.env.PORT}`
  )
);
