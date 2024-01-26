const { check } = require("express-validator");

const isNonNegative = (x) => {
  return (parseFloat(x) >= 0);
};

const addFoodItem = [
    check("foodName")
      .trim()
      .notEmpty().withMessage("Food name is required."),
    check("amount")
      .notEmpty().withMessage("Food amount is required.")
      .isNumeric().withMessage("Food amount must be numeric.")
      .custom(isNonNegative).withMessage('Amount must be non-negative'),
    check("calories")
      .notEmpty().withMessage("Calorie amount is required.")
      .isNumeric().withMessage("Calorie amount must be numeric.")
      .custom(isNonNegative).withMessage('Calorie amouont must be non-negative'),
    check("protein")
      .notEmpty().withMessage("Protein amount is required.")
      .isNumeric().withMessage("Protein amount must be numeric.")
      .custom(isNonNegative).withMessage('Protein amount must be non-negative'),
    check("carbs")
      .notEmpty().withMessage("Carbohydrate amount is required.")
      .isNumeric().withMessage("Carbohydrate amount must be numeric.")
      .custom(isNonNegative).withMessage('Carbohydrate amount must be non-negative'),
    check("fat")
      .notEmpty().withMessage("Fat amount is required.")
      .isNumeric().withMessage("Fat amount must be numeric.")
      .custom(isNonNegative).withMessage('Fat amount must be non-negative'),
  ];

module.exports = { addFoodItem };