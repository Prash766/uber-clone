import { completeProfileCaptainSchema, loginCaptainSchema, signUpCaptainSchema } from "@repo/zod-schema/captain";
import { Router } from "express";
import { completeProfileCaptain, loginCaptain, signUpCaptain , logOutCaptain } from "src/controllers/captain.controller";
import { verifyCaptainJWT } from "src/middleware/auth.middleware";
import validateSchema from "src/middleware/validation.middleware";
const router = Router()

router.route('/signup').post(validateSchema(signUpCaptainSchema), signUpCaptain)
router.route('/login').post(validateSchema(loginCaptainSchema), loginCaptain)
router.route('/logout').post( logOutCaptain)
router.route('/complete-profile').post(verifyCaptainJWT,validateSchema(completeProfileCaptainSchema), completeProfileCaptain)