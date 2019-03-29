const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateEnroll = require("../../validation/enroll");
const validateDocument = require("../../validation/document");


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
router.post("/enroll", (req, res) => {

  // Find user by id
  console.log("Test enroll from 1 users.js");

  const id =  req.body.userData.user.id;
  const productType = req.body.productType;

  console.log("id: " + id);
  console.log("productType: " + productType);

  User.findOne({  _id: id }).then(user => {
    // if (!user) {
    //   return res.status(404).json({ usernotfound: "User not found" });
    // }
    console.log("FOUND USER!");
    console.log(user);
    //console.log(req.body.user.name);

    console.log("Product Type: " + productType);

    // Validate that user can enroll in selected product
    const { errors, isValid, account } = validateEnroll(user, productType);
    if (!isValid) {
      console.log("test enroll INVALID")
      return res.status(400).json(errors);
    }

    console.log(account);


    console.log("BEFORE FIND ONE AND UPDATE:");
    User.findOneAndUpdate({_id: id}, {$push:{products:account}, $inc:{balance: -Math.abs(account.balance)}}, function(err, success) {

      console.log("Test enroll from 3 users.js VALID")
      if (err) {
        console.log(err);
      } else {
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
});


router.post("/addBalance", (req, res) => {

  // Get user data and addBalance amount
  const userData =  req.body.userData;
  var addBalance = req.body.addBalance;
  console.log(req.body);
  console.log("Test addBalance from 1 users.js " + addBalance);

  var totalBalance = +userData.user.balance + +addBalance;
  console.log("previous balance" + userData.user.balance);
  console.log("adding new" + addBalance);
  console.log("total Balance " + userData.user.balance + addBalance);
  console.log("BEFORE FIND ONE AND UPDATE:");
  User.findOneAndUpdate({_id: userData.user.id}, {$inc:{balance: totalBalance}}, function(err, success) {

    console.log("Test addBalance 2 users.js VALID")
    if(err){
      console.log(err);
    }
    else{
      console.log(success);
    }

    //res.send('Done');
    // res.json({
    //   success: true
    // });


  });
  res.json({
    success: true
  });
});



router.post("/addDocument", (req, res) => {

  // Get user data and addBalance amount
  const userData =  req.body.userData;
  const document = req.body.document;
  console.log("Test addDocument from 1 users.js");
  console.log(document);

  const { errors, isValid, newDocument } = validateDocument(document);

  if (!isValid) {
    console.log("test addDocument INVALID")
    return res.status(400).json(errors);
  }

  console.log("Test addDocument from 1.2 users.js");
  console.log(newDocument);

  console.log("BEFORE FIND ONE AND UPDATE:");
  User.findOneAndUpdate({_id: userData.user.id}, {$push:{documents: newDocument}}, function(err, success) {

    console.log("Test addDocument 2 users.js VALID")
    if(err){
      console.log(err);
    }
    else{
      console.log(success);
    }

  });
  res.json({
    success: true
  });
});



router.get("/getBalance/:userID", (req, res) => {

  console.log("Test getBalance 1 users.js");
  //const userData =  req;
  // console.log(req);
  // console.log(res);
  const userID =  req.params.userID;

  console.log(userID)
  return User.findById({_id: userID}).then(function(balance){

    console.log(" INSIDE FIND BY ID " + balance);
    // return balance when resolved
    res.send(balance);
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  console.log("Test getBalance 2 users.js");



});


router.get("/getProducts/:userID", (req, res) => {


  console.log("Test getProducts 1 users.js");
  //const userData =  req;
  // console.log(req);
  // console.log(res);
  const userID =  req.params.userID;

  console.log(userID)
  return User.findById({_id: userID}).then(function(products){

    console.log(" INSIDE FIND BY ID ");
    console.log(products)
    // return balance when resolved
    res.send(products);
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  console.log("Test getProducts 2 users.js");
});



router.get("/getUserData/:userID", (req, res) => {


  console.log("Test getUserData 1 users.js");
  //const userData =  req;
  // console.log(req);
  // console.log(res);
  const userID =  req.params.userID;

  console.log(userID);
  return User.findById({_id: userID}).then(function(balance, products, documents){

    console.log(" INSIDE FIND BY ID ");
    console.log(balance);
    console.log(products);
    console.log(documents);
    // return balance and products when resolved
    res.send(balance);
    res.send(products);
    res.send(documents);
  })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  console.log("Test getUserData 2 users.js");
});



module.exports = router;
