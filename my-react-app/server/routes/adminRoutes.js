// const express = require("express");
// const router = express.Router();
// const adminController = require("../controllers/adminController");
// const { checkAuthStatus, adminAuthCheck } = require("../middleware/authMiddleware");

// router.post('/admin-login', adminController.adminLogin);
// router.get('/users', adminAuthCheck, adminController.getUsers);
// router.put('users/:id', adminAuthCheck, adminController.updateUser);
// router.delete('/users/:id', adminAuthCheck, adminController.deleteUser);





// module.exports = router



const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { checkAuthStatus, adminAuthCheck } = require("../middleware/authMiddleware");

router.post('/admin-login', adminController.adminLogin);
router.get('/users', adminAuthCheck, adminController.getUsers);
router.put('/users/:id', adminAuthCheck, adminController.updateUser);
router.delete('/users/:id', adminAuthCheck, adminController.deleteUser);




module.exports = router
