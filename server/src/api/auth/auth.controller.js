const express = require("express");
const authService = require("./auth.service");
const authValidator = require("../../validators/authValidator");
const validatorCatcher = require("../../middlewares/validatorCatcher");
const authenticateToken = require("../../middlewares/authenticateToken");
const utils = require("../../utils");

const router = express.Router();

router.post(
    "/register",
    authValidator.register,
    validatorCatcher,
    async (req, res) => {
      try {
        const sanitizeUser = {
          email: req.body.email,
          fullname: req.body.fullname,
          password: req.body.password,
        };
        const newUser = await authService.register(sanitizeUser);
        return utils.apiResponse(201, req, res, {
          status: true,
          message: "successfully added new user",
          body: newUser,
        });
      } catch (err) {
        if (err.isCustomError) {
          return utils.apiResponse(err.statusCode, req, res, {
            status: false,
            message: err.message,
          });
        } else {
          return utils.apiResponse("500", req, res, {
            status: false,
            message: err.message ? err.message : "Something went wrong",
          });
        }
      }
    }
  );
  
router.post(
  "/login",
  authValidator.login,
  validatorCatcher,
  async (req, res) => {
  try {
    const sanitizeUser = {
      email: req.body.email,
      password: req.body.password,
    };

    const accessToken = await authService.login(sanitizeUser);

    return utils.apiResponse(200, req, res, {
      status: true,
      message: "successfully logged in",
      body: { accessToken : accessToken },
    });
    } catch (err) {
    if (err.isCustomError) {
      return utils.apiResponse(err.statusCode, req, res, {
        status: false,
        message: err.message,
      });
    } else {
      return utils.apiResponse(500, req, res, {
        status: false,
        message: err.message ? err.message : "Something went wrong.",
      });
    }
  }
});

router.get(
  "/login",
  authenticateToken,
  async (req, res) => {
    try {
        return utils.apiResponse(200, req, res, {
          status: true,
          message: "received user information",
          body: req.user,
        })
      } catch (err) {
        if (err.isCustomError) {
          return utils.apiResponse(err.statusCode, req, res, {
            status: false,
            message: err.message,
          });
        } else {
          return utils.apiResponse(500, req, res, {
            status: false,
            message: err.message ? err.message : "Something went wrong.",
          });
        }
    }
  }
);

module.exports = router;