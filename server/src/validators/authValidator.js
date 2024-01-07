const { check } = require("express-validator");

const register = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid email."),
  check("fullname")
    .notEmpty()
    .withMessage("Full name is required.")
    .isLength({ min: 4, max: 80 })
    .withMessage("Full name must have 4-80 characters.")
    .matches("^[a-zA-Z0-9 ]+$")
    .withMessage("Full name can only contain letters, numbers, and whitespaces."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 20 })
    .withMessage("Password must have 8-20 characters.")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9@$!%*?&]+$")
    .withMessage("Password must have at least one uppercase letter, one lowercase letter, and one digit.")
    .trim()
    .escape()
];

const login = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please Enter a valid email"),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .trim()
    .escape(),
];

module.exports = {register, login}