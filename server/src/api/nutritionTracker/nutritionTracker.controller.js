const express = require("express");
const nutritionTrackerService = require("./nutritionTracker.service");
const nutritionTrackerValidator = require("../../validators/nutritionTrackerValidator");
const validatorCatcher = require("../../middlewares/validatorCatcher");
const utils = require("../../utils");
const { parse } = require("dotenv");

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
  "/",
  nutritionTrackerValidator.getFoodLog,
  validatorCatcher,
  async (req, res) => {
    try {
      const sanitizeQuery = {
        userId: req.query.userId,
        date: req.query.date
      }
      const foodLog = await nutritionTrackerService.getFoodLog(sanitizeQuery);
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

module.exports = router;