const { userAuthCheck } = require("../middleware/authCheck");

const router = require("express").Router();

router.get("/", userAuthCheck, );