import { Router } from "express";
import { getAllClient,
    addClient,
    updateClient,
    deleteClient } from "./client.controller.js";
import { validateJwt, isAdmin } from "../../middlewares/validate.jwt.js";
import { clientValidator,clientValidatorId } from "../../middlewares/validators.js";

const api = Router()

api.get('/getClient',validateJwt,getAllClient)
api.post('/addClient',validateJwt,clientValidator,addClient)
api.put('/updateClient/:id',validateJwt,clientValidator,clientValidatorId,updateClient)
api.delete('/deleteClient/:id',[validateJwt, isAdmin],clientValidatorId,deleteClient)

export default api