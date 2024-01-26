const utils = require("../../utils");
const nutritionTrackerRepository = require("./nutritionTracker.repository");

const addFoodItem = async (foodData) => {
    try {
        const foodName = await nutritionTrackerRepository.findFoodByName(foodData.food_name);
        if (foodName) {
            throw utils.customError("400", "Food item already exists");
        }
    
        const newFood = await nutritionTrackerRepository.createNewFoodItem(foodData);
        if (!newFood) {
            throw utils.customError("400", "Failed to create new food item");
        }
        return newFood;
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
};

module.exports = { addFoodItem };