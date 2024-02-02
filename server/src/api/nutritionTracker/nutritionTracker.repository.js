const prisma = require("../../db");

const createNewFoodItem = async (foodData) => {
    const foodItem = await prisma.food.create({
        data: foodData,
    });
    return foodItem;
};

const findFoodByName = async (foodName) => {
    const foodItem = await prisma.food.findFirst({
        where: {
            food_name : foodName
        },
});
    return foodItem;
};

const findAllFood = async ()  => {
    const allFood = await prisma.food.findMany();
    return allFood;
}

const findFoodLogsByIdAndDate = async (userId, date) => {
    const foodLogs = await prisma.nutritionTracker.findMany({
        where: {
            user_id : userId,
            consumed_at : date
        },
        include: {
            food: true,
        }
    })
    return foodLogs
}

const deleteFoodLogById = async (foodLogId) => {
    const deletedFoodLog = await prisma.nutritionTracker.delete({
        where: {
          id: foodLogId,
        },
    })
    return deletedFoodLog
}
 
const createNewFoodLog = async (foodLogData) => {
    const foodLog = await prisma.nutritionTracker.create({
        data: foodLogData,
    });
    return foodLog;
};

module.exports = { createNewFoodItem, findFoodByName, findAllFood, findFoodLogsByIdAndDate, deleteFoodLogById, createNewFoodLog }
  