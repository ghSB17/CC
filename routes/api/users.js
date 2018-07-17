const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
// const keys = require("../../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

//Load input Validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateProfileInput = require('../../validation/profile')

//Load User Model
const User = require("../../models/User");

//@route: GET to /api/users/test
//@desc: Testing the GET route
//@access: public
router.get("/test", (req, res) => {
  res.json({
    msg: "testing /api/users/test"
  });
});

//@route: POST to /api/users/register
//@desc: Register a user
//@access: public
router.post("/register", (req, res) => {
  const {
    errors,
    isValid
  } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
      email: req.body.email
    })
    .then(user => {
      if (user) {
        errors.email = "Email already exists!!";
        res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: avatar,
          address: req.body.address,
          address2: req.body.address2,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode,
          phonenumber: req.body.phonenumber
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hashPwd) => {
            if (err) throw err;
            newUser.password = hashPwd;
            newUser
              .save()
              .then(newuser => res.status(200).json(newuser))
              .catch(err => res.status(400).json(err));
          });
        });
      }
    })
    .catch(err => {
      console.log("error .....");
      console.log(err);
    });
});

//@route: POST to /api/users/login
//@desc: Login a user, return JWT(jason-web-token)
//@access: public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({
      email: email
    })
    .then(user => {
      if (!user) {
        errors.email = "Incorrect email!! User not found";
        res.status(404).json(errors);
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            //user matched
            const payload = {
              id: user._id,
              name: user.name,
              avatar: user.avatar,
              email:user.email,
              city: user.city,
              state: user.state,
              admin: user.admin,
              zipcode: user.zipcode,
            };
            jwt.sign(
              payload,
              process.env.secretOrKey, {
                expiresIn: 3600
              },
              (error, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            errors.password = "Incorrect Password!!";
            res.status(400).json(errors);
          }
        });
      }
    })
    .catch(err => {
      res.json(err);
    });
});

//@route: POST to /api/users/pwdtoken
//@desc: Update Password Reset Token
//@access: private
router.post('/pwdtoken',
  passport.authenticate("jwt", {session: false}),
  (req, res) => { 
    User.findByIdAndUpdate({_id:req.user.id},
      {pwdresettoken:req.body.token,
       pwdresetexp:Date.now()+900000
      },{new:true}, ( err, user) => {
        console.log(user)
        res.json(user)
      })
  })

  //@route: POST to /api/users/updatepwd
//@desc: Update Password 
//@access: private
router.post('/updatepwd/:pwdtoken',
passport.authenticate("jwt", {session: false}),
(req, res) => { 
  console.log("#######################")
  console.log(req.params.pwdtoken)
  const token=req.params.pwdtoken
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hashPwd) => {
      if (err) throw err;
      const password = hashPwd;
      User.findOneAndUpdate(
        {_id:req.user.id, pwdresettoken:token, pwdresetexp:{$gt:Date.now()}},
        {password:password, pwdresettoken:"", pwdresetexp:0},
         {new:true}, ( err, updateduser) => {
          console.log(updateduser)
          res.json(updateduser)
        }).catch(err => res.status(400).json(err))
    });
  })
})


//@route: GET to /api/users/current
//@desc: Get the current user
//@access: private
router.get(
  "/current",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      address: req.user.address,
      address2: req.user.address2,
      city: req.user.city,
      state: req.user.state,
      zipcode: req.user.zipcode,
      phonenumber:req.user.phonenumber,
      admin: req.user.admin
    });
  }
);

//@route: GET to /api/users/all
//@desc: Get all the users
//@access: private
router.get(
  "/all",
  passport.authenticate("jwt", {
    session: false
  }),
  (req, res) => {
    console.log(req.user);
    User.find({})
      .then(users => {
        if (req.user.admin) {
          res.json(users);
        } else {
          res.status(400).json({
            access: "Access Denied!!"
          });
        }
      })
      .catch(err => console.log(err));
  }
);

//@route: POST to /api/users/current
//@desc: update current user Info
//@access: private
router.post(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const {errors,isValid} = validateProfileInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const avatar = gravatar.url(req.body.email, {
      s: "200",
      r: "pg",
      d: "mm"
    });
    console.log(req.body)
    console.log(avatar)
    User.findByIdAndUpdate({_id:req.user.id}, 
      {name : req.body.name,
      email : req.body.email,
      avatar : avatar,
      address : req.body.address,
      address2 : req.body.address2,
      city : req.body.city,
      state : req.body.state,
      zipcode : req.body.zipcode,
      phonenumber : req.body.phonenumber}, (err, uUser) => {
        if(err) throw err
        res.json(uUser)
      })
    
    .catch(err => console.log(err));
  })


module.exports = router;