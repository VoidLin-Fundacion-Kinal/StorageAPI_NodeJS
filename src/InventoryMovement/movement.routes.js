import { Router } from "express";

import { validateJwt,isAdmin } from "../../middlewares/validate.jwt";

import { addmovement,
        addmovementExit,
        getMovements,
        getMovemetsWithID,
        deleteInventoryMovement,
        updateInventoryMovement,
        withoutId } from "./movement.controller";

import { registerMovement } from "../../middlewares/validators";

const api = Router()

export default api