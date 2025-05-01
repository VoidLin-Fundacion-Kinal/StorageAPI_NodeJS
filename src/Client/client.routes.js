import { Router } from "express";
import { getAllClient,
    addClient,
    updateClient,
    deleteClient } from "./client.controller.js";

const api = Router()

api.get('/getClient',getAllClient)
api.post('/addClient',addClient)
api.put('/updateClient/:id',updateClient)
api.delete('/deleteClient/:id',deleteClient)

export default api