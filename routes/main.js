const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const personsController = require("../controllers/persons");
const homeController = require("../controllers/home");

router.get("/", homeController.getIndex);
router.get("/login*", authController.getLogin);
router.post("/profile", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup*", authController.postSignup);

module.exports = router;
