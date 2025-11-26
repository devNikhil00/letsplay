const {Router} = require('express');
const { registerUser } = require('../controllers/user.controller');

const {Upload} = require('../middlewares/multer.middleware.js');
const { User } = require('../models/user.model.js');

const router = Router();

router.route('/register').post(
    Upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImages",
            maxCount: 1
        }
    ]), 
    registerUser);
module.exports = router;