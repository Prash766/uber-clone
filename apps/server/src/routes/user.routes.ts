import { Router } from "express";
import validateSchema from "../middleware/validation.middleware";
import {loginSchema, signUpSchema} from "@repo/zod-schema/user";
import { getUserProfile, loginUser, logOutUser, signUpUser } from "../controllers/user.controller";
import {verifyUserJWT} from "../middleware/auth.middleware";

const router = Router()

router.route('/signup').post(validateSchema(signUpSchema), signUpUser)
router.route('/login').post(validateSchema(loginSchema), loginUser)
router.route('/profile').get(verifyUserJWT , getUserProfile)
router.route('/logout').get(verifyUserJWT ,logOutUser )


    
export default router