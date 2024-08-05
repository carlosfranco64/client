const router = require("express").Router();


const { register, login, logout, profile, verifyToken } = require("../controllers/auth.controllers");
const { authRequired } = require("../middleware/validateToken");
const validateSchema = require("../middleware/validator.middleware");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");



router.post("/register",validateSchema(registerSchema), register);

router.post("/login",validateSchema(loginSchema),login);

router.post("/logout",logout);

router.get("/profile",authRequired,profile);

router.get("/verify",verifyToken)



module.exports = router
  
