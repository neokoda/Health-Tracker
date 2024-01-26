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

module.exports = { createNewFoodItem, findFoodByName }
  