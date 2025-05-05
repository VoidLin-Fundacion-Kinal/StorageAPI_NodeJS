import { Router } from "express";

import { validateJwt,
        isAdmin } from "../../middlewares/validate.jwt.js";

import { generateReportMovement } from "../../middlewares/validators.js";

import { getInventoryMovements } from "../InventoryMovementReport/InventoryMovementReport.controller.js";

const api = Router()

api.get('/report',[validateJwt, isAdmin],generateReportMovement,getInventoryMovements)


export default api