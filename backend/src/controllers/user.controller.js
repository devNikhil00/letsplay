const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');

const registerUser = asyncHandler(async(req, res)=>{
    res.status(200).json({
        message:"Hello this side nikhil",
    })
})

module.exports = {
    registerUser,
};