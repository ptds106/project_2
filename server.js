var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var passport = require("passport");
var cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
var app = express();

require("dotenv").config();
require("./config/passport");
require("./config/database");

var indexRouter = require("./routes/index");

var historyRouter = require("./routes/wars/histories");
const ancientsRouter = require("./routes/wars/ancients");
const medivalsRouter = require("./routes/wars/medivals");
const modernsRouter = require("./routes/wars/moderns");
const contemporariesRouter = require("./routes/wars/contemporaries");

var weaponsRouter = require("./routes/weapons/histories");
const ancientsWeaponsRouter = require("./routes/Weapons/ancients");
const medivalsWeaponsRouter = require("./routes/Weapons/medivals");
const modernsWeaponsRouter = require("./routes/Weapons/moderns");
const contemporariesWeaponsRouter = require("./routes/Weapons/contemporaries");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "SEIRocks!",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use("/", indexRouter);
app.use("/", historyRouter);

app.use("/ancients", ancientsRouter);
app.use("/medivals", medivalsRouter);
app.use("/moderns", modernsRouter);
app.use("/contemporaries", contemporariesRouter);

app.use("/weapons/ancients", ancientsWeaponsRouter);
app.use("/weapons/medivals", medivalsWeaponsRouter);
app.use("/weapons/moderns", modernsWeaponsRouter);
app.use("/weapons/contemporaries", contemporariesWeaponsRouter);
app.use("/weapons", weaponsRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
