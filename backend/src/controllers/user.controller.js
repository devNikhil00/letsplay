const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/user.model');   // Using PascalCase for models is industry standard
const { apiError } = require('../utils/apiError');
const { uploadOnCloudinary } = require('../utils/cloudInary');
const { ApiResponse } = require('../utils/apiResponse');
const {Upload} = require('../middlewares/multer.middleware.js');

// ============================================================================
// User Registration Controller
// This controller executes a multi-stage onboarding pipeline:
// 1. Extract payload                   → req.body
// 2. Field validation                  → prevent empty fields
// 3. User duplication check            → email / username conflict
// 4. Media validation                  → avatar mandatory
// 5. Upload assets to Cloudinary       → avatar + cover image
// 6. Persist record in DB              → User.create()
// 7. Sanitize output                   → remove sensitive fields
// 8. Standardized API response         → ApiResponse
// ============================================================================

const registerUser = asyncHandler(async (req, res) => {
  
    //steps
    //1. get user data from req.body
    // 2 validation
    // 3. check if user already exists
    // 4 check for images, avatars upload
    // 5. upload them to cloudinary
    // 6. create user in db
    // 7 . send response
    // remove password and refresh token fieald from response
    // check for user creation 
    // return response

    const { username, email, password, fullName } = req.body;
    console.log("email:", email);

    // if(fullName ==="" ){
    //     throw new apiError(400, "Fullname is required");
    // }

    // if(
    //     [fullName, email, password, username].includes("")
    // ){
    //     throw new apiError(400, "All fields are required");
    // } or

    // checking the fields
    // Enhanced: using .some() makes this more dynamic and scalable
    if (
        [fullName, email, password, username].some((field) =>
            field?.trim() === ""
        )
    ) {
        throw new apiError(400, "All fields are required");
    }

    // checking if user already exists
    // Using $or allows us to check email OR username in one query
    const existedUser = await User.findOne({
        $or: [{ email }, { username }],
    });
    if (existedUser) {
        throw new apiError(409, "User already exists");
    }

    // Extracting local file paths from Multer
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImagesLocalPath = req.files?.coverImages?.[0]?.path;

    // Avatar must be present
    if (!avatarLocalPath) {
        throw new apiError(400, "Avatar is required");
    }

    //    if(!coverImagesLocalPath){
    //     throw new apiError (400, "Cover image is required");
    //    }

    // Upload avatar & cover image to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImages = await uploadOnCloudinary(coverImagesLocalPath);

    if (!avatar) {
        throw new apiError(400, "Avatar upload failed");
    }

    // Creating user in DB
    // It's important that we DO NOT reuse "User" (model) as a local variable
    const newUser = await User.create({
        fullName,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImages?.url || "",
    });

    // Removing sensitive fields (password, refreshToken)
    const createdUser = await User.findById(newUser._id).select(
        "-password -refreshToken "
    );

    if (!createdUser) {
        throw new apiError(500, "User creation failed");
    }

    // Send response using centralized ApiResponse class
    return res.status(201).json(
        new ApiResponse(
            201,
            createdUser,
            "User created successfully"
        )
    );
});

module.exports = {
    registerUser,
};
