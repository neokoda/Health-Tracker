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

const findFoodLogsByIdAndDate = async (userId, date) => {
    const foodLogs = await prisma.nutritionTracker.findMany({
        where: {
            user_id : userId,
            consumed_at : date
        }
    })
    return foodLogs
}

module.exports = { createNewFoodItem, findFoodByName, findFoodLogsByIdAndDate }
  