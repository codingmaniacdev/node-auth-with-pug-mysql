const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET;
const {
    validationResult
} = require('express-validator');
const model = require('../models/index');

exports.index = async (req, res, next) => {
    if (Object.keys(req.body).length !== 0) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('index', {
                errors: errors.array()
            });
        } else {
            try {
                const {
                    email,
                    password
                } = req.body;
                let user = await model.user.findOne({
                    where: {
                        email: email
                    }
                });
                if (user && Object.keys(user).length !== 0) {
                    const matchPassword = await bcrypt.compare(password, user.password);
                    if(matchPassword) {
                        res.redirect('/dashboard');
                    } else {
                        res.render('index', {
                            status: false,
                            message: 'Invalid Email or Password'
                        });
                    }
                } else {
                    res.render('index', {
                        status: false,
                        message: 'Invalid Email Address'
                    });
                }
            } catch (err) {
                console.error(err);
                res.render('index', {
                    status: false,
                    message: err.message
                });
            }
        }
    } else {
        res.render('index', {
            title: "Welcome to Skillspace"
        });
    }
};

exports.register = async (req, res, next) => {
        if (Object.keys(req.body).length !== 0) {

            const errors = validationResult(req);
            const prevValues = req.body;

            if (!errors.isEmpty()) {
                res.render('register', {
                    errors: errors.array(),
                    prevValues: prevValues
                });
            } else {
                const {
                    name,
                    email,
                    password
                } = req.body;
                const username = name.split(' ')[0];
                const hash = await bcrypt.hash(password, 10);

                try {
                    const newUser = await model.user.create({
                        name,
                        email,
                        password: hash,
                        username
                    });

                    res.redirect('/dashboard');
                } catch (err) {
                    console.log(err);
                    res.render('register', {
                        status: false,
                        message: 'Registration Failure',
                        error: err.message
                    });
                }
            }


        } else {
            res.render('register', {
                title: "Create Account",
                errors: []
            });
        }
    },

    exports.forgotPassword = (req, res, next) => {
        res.render('forgot-password', {
            title: "Forgot Password"
        });
    };

    exports.remove = async(req, res, next) => {
        const id = req.params.id;
        const find = await model.user.findByPk(id);
        if(find) {
            await find.destroy();
            res.redirect('/dashboard');
        } else {
            res.render('dashboard', {status: false, message: 'Delete Failed'});
        }
    }

    exports.generateToken = (userId) => {
        return jwt.sign({ userId }, secretKey, { expiresIn: "1h" });
      };

    exports.verifyToken = (req, res, next) => {
        const token = req.headers.authorization;
      
        if (!token) {
          return res.status(401).json({ error: "Unauthorized" });
        }
      
        jwt.verify(token, secretKey, (err, decoded) => {
          if (err) {
            res.status(401).json({ error: "Invalid Token" });
          }
          req.userId = decoded.userId;
          next();
        });
      };