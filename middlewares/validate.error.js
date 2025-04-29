
import { validationResult } from "express-validator"

//Valida los errores.
export const validateErrors = (req, res, next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                errors: errors
            }
        )
    }
    next()
}

//Valida si hay campos vacios.
export const validateErrorsWithoutFiles = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(validationResult(req))
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                success: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}

/*OBSERVACIÓN: Si se llegan agregar un Middleware nuevo, tomar en cuenta
su funcionalidad y agregar un comentario acerca de eso. */