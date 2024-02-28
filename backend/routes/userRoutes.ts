import express from "express"

// Validators
import { loginValidator, signupValidator } from "../middleware/validators/userValidators"

// Controllers
import { loginUser,signupUser } from "../controller/userControllers"

const router = express.Router()


router.post("/login",loginValidator, loginUser)
router.post("/signup", signupValidator, signupUser)





export default router