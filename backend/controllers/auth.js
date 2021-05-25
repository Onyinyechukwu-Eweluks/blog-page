const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressjwt = require("express-jwt");

//express-jwt checks if token has expired or is valid

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email already exist",
      });
    }

    const { name, email, password } = req.body;
    let username = shortId.generate();
    let profile = `${process.env.CLIENT_URL}/profile/${username}`;

    let newUser = new User({ name, email, password, profile, username });
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      // res.json({
      //   user: success,
      // });
      res.json({
        message: "signup successfull",
      });
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  //check if user exist
  User.findOne({ email: email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: "User with that email does not exist, Please signup",
      });
    }
    //authenticate password
    if (!user.authenticate(password)) {
      return res.status(400).json({
        err: "Email and password do not match",
      });
    }
    //generate token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, { expiresIn: "1d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "Signout successfully",
  });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
