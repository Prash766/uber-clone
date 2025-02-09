import {Router} from 'express'
import { searchPlacesList } from '../controllers/location.controller'
import { verifyUserJWT } from '../middleware/auth.middleware'

const router = Router()

router.route('/locationSearch').post(verifyUserJWT , searchPlacesList)


export default router