const { models } = require("mongoose");
const userController = require("../controllers/userController");
const { userAuthCheck } = require("../middleware/authCheck");
const {validateUserRegistration} = require("../middleware/validateUser");
const router = require("express").Router();

router.get("/", userAuthCheck, (req, res)=>{
    res.send('protected route accessed')
} );

router.post('/register',  userController.userRegister)

router.post('/login', userController.userLogin)

module.exports = router