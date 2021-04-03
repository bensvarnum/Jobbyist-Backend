require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const userRoutes = require('./routes/user')

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(session({
  secret: "pleaseexcusemydearauntsally",
  resave: true,
  saveUninitialized: true,
}))
app.use(cookieParser('pleaseexcusemydearauntsally'))
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig/passport-local')(passport)

//routes below cors

app.get("/", (req, res) => {
  res.send("Welcome to the Jungle");
});

app.use("/user", userRoutes);


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.set("useFindAndModify", false);
