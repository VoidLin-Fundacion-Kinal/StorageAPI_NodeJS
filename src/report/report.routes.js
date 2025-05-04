import { Router } from "express";
import { inventoryReport } from "./report.cotroller.js";

const api = Router()

api.get('/getInventory', inventoryReport)

export default api