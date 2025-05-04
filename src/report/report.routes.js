import { Router } from "express";
import { inventoryReport } from "./report.cotroller.js";
import {validateJwt} from '../../middlewares/validate.jwt.js'
const api = Router()

api.get('/getInventory',validateJwt, inventoryReport)

export default api