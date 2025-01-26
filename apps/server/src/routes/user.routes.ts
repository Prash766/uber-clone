import { Router } from "express";
import validateSchema from "../middleware/validation.middleware";
import {loginSchema, signUpSchema} from "@repo/zod-schema/schema"
import { getUserProfile, loginUser, logOutUser, signUpUser } from "../controllers/user.controller";
import verifyJWT from "../middleware/auth.middleware";

const router = Router()

router.route('/signup').post(validateSchema(signUpSchema), signUpUser)
router.route('/login').post(validateSchema(loginSchema), loginUser)
router.route('/profile').get(verifyJWT , getUserProfile)
router.route('/logout').get(verifyJWT ,logOutUser )



export default router