import {Router} from 'express'
import { rideRoute , ridePricing} from '../controllers/ride.controller'
import { verifyUserJWT } from '../middleware/auth.middleware'
const router = Router()

router.route('/navigation/route').post(verifyUserJWT, rideRoute)
router.route('/navigation/price').post(verifyUserJWT , ridePricing)

export default router