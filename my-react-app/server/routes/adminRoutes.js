const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { adminAuthCheck } = require("../middleware/authMiddleware");

router.post("/admin-login", adminController.adminLogin);
router.get("/users", adminAuthCheck, adminController.getUsers);
router.put("/users/:id", adminAuthCheck, adminController.updateUser);
router.delete("/users/:id", adminAuthCheck, adminController.deleteUser);
router.post("/add-user", adminAuthCheck, adminController.addUser);
router.post("/bulk-delete", adminAuthCheck, adminController.bulkDelete)
router.get("/admin-logout", adminController.adminLogout);

module.exports = router;
