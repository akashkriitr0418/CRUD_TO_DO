const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {
  userRegister,
  userLogin,
  userLogout,
} = require("../controllers/routeUserControl");


router.post("/register", userRegister);
router.post("/login", userLogin);
router.post("/logout",userLogout);

module.exports = router;
