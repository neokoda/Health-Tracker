const bcrypt = require("bcryptjs");
const utils = require("../../utils");
const authRepository = require("./auth.repository");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
    try {
        const userEmail = await authRepository.findUserByEmail(userData.email);
        if (userEmail) {
            throw utils.customError("400", "User with that email already exists");
        }

        const hashedPassword = bcrypt.hashSync(userData.password);
    
        const userHashed = {
            ...userData,
            password: hashedPassword,
        };
    
        const newUser = await authRepository.createUser(userHashed);

        if (!newUser) {
            throw utils.customError("400", "Failed to register new account");
        }

        return newUser;
    } catch (err) {
        if (err.isCustomError) {
            throw err;
        }
        throw new Error(err);
    }
};

const login = async (incomingUser) => {
    try {
      const userData = await getUserByEmail(incomingUser.email);
      
      if (!bcrypt.compareSync(incomingUser.password, userData.password)) {
        throw utils.customError("401", "Wrong password");
      } else {
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
        return accessToken;
      }
    } catch (err) {
      if (err.isCustomError) {
        throw err 
    }
      throw new Error(err);
    }
  }

const getUserByEmail = async (email) => {
    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw utils.customError("404", "User not found");
    }
    return user;
  };

module.exports = { register, getUserByEmail, login };