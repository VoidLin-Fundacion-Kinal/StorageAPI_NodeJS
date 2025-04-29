import {Router} from 'express'

import {
    updateUser,
    updatePassword,
    deleteUser,

} from './user.controller.js'

import {
    updateUserValidator,
    deleteUserValidator,
    updatePasswordValidator
} from '../../middlewares/validators.js'

import {
    validateJwt
} from '../../middlewares/validate.jwt.js'

const api = Router()

// Actualizar Usuario
api.put('/updateUser/:id', validateJwt, updateUserValidator, updateUser)
// Actualizar Contraseña
api.put('/updatePassword', validateJwt, updatePasswordValidator, updatePassword)
// Eliminar Usuario
api.delete('/deleteUser/:id', validateJwt, deleteUserValidator, deleteUser)


/* Observación: Colocar comentario acerca de la Ruta a funcionar. */

export default api

