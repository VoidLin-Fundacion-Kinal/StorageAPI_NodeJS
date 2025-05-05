import { Router } from "express";

import { validateJwt,
        isAdmin } from "../../middlewares/validate.jwt.js";

import { addmovement,
        addmovementExit,
        getMovements,
        getMovemetsWithID,
        historialProducts,
        historialProductsById,
        deleteInventoryMovement,
        updateInventoryMovement,
        withoutId } from "./movement.controller.js";

import { registerMovement, 
        registerMovementExit, 
        updateMovement,
        whitoutIDMovementsProducts } from "../../middlewares/validators.js"; 

const api = Router()


//POST
api.post('/registerExit', validateJwt, registerMovementExit,addmovementExit)

api.post('/registerEntrance',validateJwt,registerMovement,addmovement)

//GET
api.get('/getMovements', validateJwt, getMovements)

api.get('/getMovements/products/',validateJwt,withoutId)

api.get('/getMovements/:id',validateJwt,getMovemetsWithID)

api.get('/getMovements/products/all',validateJwt,historialProducts)

api.get('/getMovements/products/:id',validateJwt,whitoutIDMovementsProducts,historialProductsById)


//delete
api.delete('/deleteMovement/:id',validateJwt,deleteInventoryMovement)

api.delete('/deleteMovement',validateJwt,withoutId)

//update
api.put('/updateMovement/:id',validateJwt,updateMovement,updateInventoryMovement)

api.put('/updateMovement',validateJwt,withoutId)


export default api