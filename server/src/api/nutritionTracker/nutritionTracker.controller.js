const express = require("express");
const nutritionTrackerService = require("./nutritionTracker.service");
const nutritionTrackerValidator = require("../../validators/nutritionTrackerValidator");
const validatorCatcher = require("../../middlewares/validatorCatcher");
const utils = require("../../utils");
const { parse } = require("dotenv");
const authenticateToken = require("../../middlewares/authenticateToken");

const router = express.Router();

router.post(
    "/add-food-item",
    nutritionTrackerValidator.getFoodLog,
    validatorCatcher,
    async (req, res) => {
      try {
        const sanitizeFood = {
          food_name: req.body.foodName,
          amount: parseFloat(req.body.amount),
          calories: parseFloat(req.body.calories),
          proteins: parseFloat(req.body.protein),
          carbohydrates: parseFloat(req.body.carbs),
          fats: parseFloat(req.body.fat),
        };
        const newFoodItem = await nutritionTrackerService.addFoodItem(sanitizeFood);

        return utils.apiResponse(201, req, res, {
          status: true,
          message: "successfully added new food item",
          body: newFoodItem,
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

router.get(
  "/", authenticateToken,
  nutritionTrackerValidator.getFoodLog,
  validatorCatcher,
  async (req, res) => {
    try {
      const userIdAndDate = {
        userId: req.user.id,
        date: req.query.date
      }
      const foodLog = await nutritionTrackerService.getFoodLog(userIdAndDate);
      return utils.apiResponse(200, req, res, {
        status: true,
        message: "food logs retrieved",
        body: foodLog,
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

router.get(
  "/food-list",
  async (req, res) => {
    try {
      const allFood = await nutritionTrackerService.getAllFood();
      return utils.apiResponse(200, req, res, {
        status: true,
        message: "food items retrieved",
        body: allFood,
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

router.delete(
  "/delete-food-item",
  nutritionTrackerValidator.deleteFoodLog,
  validatorCatcher,
  async (req, res) => {
    try {
      const foodLogId = parseInt(req.query.foodLogId, 10);
      const deletedFoodLog = await nutritionTrackerService.deleteFoodLog(foodLogId);
      return utils.apiResponse(200, req, res, {
        status: true,
        message: "deleted food log",
        body: deletedFoodLog,
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
  "/add-food-log", 
  authenticateToken,
  nutritionTrackerValidator.addFoodLog,
  validatorCatcher,
  async (req, res) => {
    try {
      const sanitizeForm = {
        userId: req.user.id,
        food_name: req.body.foodName,
        date: req.body.date,
        amount: parseInt(req.body.amount),
        amountType: req.body.amountType
      };
      const newFoodLog = await nutritionTrackerService.addFoodLog(sanitizeForm);

      return utils.apiResponse(201, req, res, {
        status: true,
        message: "successfully added new food log",
        body: newFoodLog,
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

module.exports = router;