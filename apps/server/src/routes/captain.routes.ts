import { completeProfileCaptainSchema, loginCaptainSchema, signUpCaptainSchema } from "@repo/zod-schema/captain";
import { Router } from "express";
import { completeProfileCaptain, loginCaptain, signUpCaptain , logOutCaptain, captainVehicleRegistration } from "../controllers/captain.controller";
import { verifyCaptainJWT } from "../middleware/auth.middleware";
import validateSchema from "../middleware/validation.middleware";
const router = Router()

router.route('/signup').post(validateSchema(signUpCaptainSchema), signUpCaptain)
router.route('/login').post(validateSchema(loginCaptainSchema), loginCaptain)
router.route('/logout').post( logOutCaptain)
router.route('/vehicle-registration').post(verifyCaptainJWT ,captainVehicleRegistration )
router.route('/complete-profile').post(verifyCaptainJWT,validateSchema(completeProfileCaptainSchema), completeProfileCaptain)

export default router