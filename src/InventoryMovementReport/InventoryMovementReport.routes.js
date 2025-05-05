import { Router } from "express"
import { getInventoryMovements } from "./InventoryMovementReport.controller.js"

const api = Router()

api.post('/movements', getInventoryMovements)

export default api