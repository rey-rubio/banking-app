const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const types = require("../../models/products/types");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEnroll = require("../../validation/enroll");

// Load User model
const User = require("../../models/User");

// // Load Account models
// const Account = require("../../models/Account");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }
    else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err)
            throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched, so
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          balance: user.balance,
          employmentHistory: user.employmentHistory,
          products: user.products
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
      else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});



// @route POST api/users/enroll
// @desc Enroll a user in a selected product
// @access Public
//router.put("/enroll",  passport.authenticate("jwt", { session: false }), (req, res) => {
//
router.post("/enroll", (req, res) => {


  // Find user date
  const userData =  req.body.userData;
  const productType = req.body.productType;

  console.log("Test enroll from 1 users.js");
  //console.log(req.body.user.name);

  console.log("Product Type: " + productType);
  const { errors, isValid } = validateEnroll(userData, productType);

  // Check validation before proceeding
  if (!isValid) {
    console.log("Test enroll from 2 users.js INVALID")
    return res.status(400).json(errors);
  }

  // Find user
  console.log("TEST:");
  console.log(req.body.userData.user);

  console.log("BEFORE CREATING account:");
  var account = {
    name: productType,
    balance: 500,
    date : Date.now(),
    isActive: true
  };

  console.log(account);

  console.log("BEFORE FIND ONE AND UPDATE:");
  User.findOneAndUpdate({_id: req.body.userData.user.id}, {$push:{products:account}}, function(err, success) {

    console.log("Test enroll from 3 users.js VALID")
    if(err){
      console.log(err);
    }
    else{
      console.log(success);
    }

    //res.send('Done');
    console.log("Test enroll from 4 users.js VALID")
    res.json({
      success: true
    });

    console.log("Test enroll from 5 users.js VALID")
    // // if you want update all settings object
    // item.settings = req.body;
    // // if something on settings field, item.settings.field1 = req.body.field1
    // item.save(function(err) {
    //   if (err)
    //     res.send(err);
    //
    //   res.json({ message: 'Your item updated!' });
    // });

  });
});

module.exports = router;
