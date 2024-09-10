const { models } = require("mongoose");
const userController = require("../controllers/userController");
const {validateUserRegistration} = require("../middleware/validateUser");
const { checkAuthStatus } = require("../middleware/authMiddleware");
const router = require("express").Router();

router.get("/", checkAuthStatus, (req, res)=>{
    res.send('protected route accessed')
});
router.post('/register',  userController.userRegister)
router.post('/login', userController.userLogin)
router.get('/logout', userController.userLogout)
router.get('/auth-status', checkAuthStatus)

module.exports = router