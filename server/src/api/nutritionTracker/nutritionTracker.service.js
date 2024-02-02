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

const getFoodLog = async (userAndDate) => {
    try {
        const userId = parseInt(userAndDate.userId, 10);
        date = new Date(userAndDate.date);
        const dateISO = date.toISOString();

        const foodLog = await nutritionTrackerRepository.findFoodLogsByIdAndDate(userId, dateISO);
        if (!foodLog) {
            throw utils.customError("404", "No log was found");
        }
        return foodLog;
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
};

const getAllFood = async () => {
    try {
        const allFood = await nutritionTrackerRepository.findAllFood();

        return allFood;
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
};

const deleteFoodLog = async (foodLogId) => {
    try {
        const deletedFoodLog = await nutritionTrackerRepository.deleteFoodLogById(foodLogId);
        if (!deletedFoodLog) {
            throw utils.customError("404", "Food log not found");
        }
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
}

const addFoodLog = async (logFormData) => {
    try {
        const foodName = await nutritionTrackerRepository.findFoodByName(logFormData.food_name);
        if (!foodName) {
            throw utils.customError("404", "Food item not found");
        }
        console.log(logFormData);
        const foodLogData = {
            user_id: logFormData.userId,
            consumed_at: `${logFormData.date}T00:00:00Z`,
            food_id: foodName.id,
            amount: (logFormData.amountType === "servings" ? logFormData.amount : logFormData.amount / foodName.amount),
        }
        const newFoodLog = await nutritionTrackerRepository.createNewFoodLog(foodLogData);
        if (!newFoodLog) {
            throw utils.customError("400", "Failed to create new food log");
        }
        return newFoodLog;
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
};

module.exports = { addFoodItem, getFoodLog, getAllFood, deleteFoodLog, addFoodLog };