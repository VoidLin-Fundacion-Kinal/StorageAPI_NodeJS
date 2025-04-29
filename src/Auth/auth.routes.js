import {Router} from 'express'

import {
    login,
    register
} from './auth.controller.js'

import {
    registerValidator
} from '../../middlewares/validators.js'

const api = Router()

//Inicio de Sesión
api.post('/login', login)

//Registro de Usuario
api.post('/register', registerValidator, register)

/* Observación: Colocar comentario acerca de la Ruta a funcionar. */

export default api
