import {
    param,
    body
} from 'express-validator'

import {
    validateErrors,
    validateErrorsWithoutFiles
} from './validate.error.js'

import {
    emailExistProvider,
    existEmail,
    existUsername,
    movementsExists,
    nameExistProvider,
    notRequiredField,
    productsExists,
    providerExists
} from '../utils/db.validators.js'

/* Observación: Colocar comentario acerca de la Validación */


// Validaciones para el registro de usuario
export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password must be 8 characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]

//Validaciones para que el usuario actualice su perfil.
export const updateUserValidator = [
    body('username', 'Name cannot be empty')
        .optional()
        .notEmpty()
        .toLowerCase()
        .custom((username, {req}) => existUsername(username, req.user)),
    body('email', 'Email cannot be empty')
        .optional()
        .notEmpty()
        .isEmail()
        .custom((email, {req})=> existEmail(email, req.user)),
    body('password')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('role')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]

//Validaciones para que el usuario elimine su perfil.
export const deleteUserValidator = [
    body('password', 'Password cannot be empty')
        .notEmpty(),
    validateErrors
]


//Validaciones para que el usuario actualice su contraseña.
export const updatePasswordValidator = [
    body('oldPassword', 'Old password cannot be empty')
        .notEmpty(),
    body('newPassword', 'New password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('New password must be strong')
        .isLength({min: 8, max: 20})
        .withMessage('Enter your password again'),
    validateErrors
]

///Validacion al agregar proveedor 
export const providerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .trim()       //Elimina espacios en blanco por si se deja alguno
        .custom(nameExistProvider),
    body('surname', 'Surname cannot be empty')
        .notEmpty()
        .trim(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(emailExistProvider),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isLength({ min: 8, max: 8 })
        .withMessage('Phone must be exactly 8 digits')
        .isNumeric() //Verifica que solo sean valores numericos
        .withMessage('Phone must contain only numbers'),
    body('address', 'Address cannot be empty')
        .notEmpty()
        .trim(),
    validateErrors
]

export const deleteProviderValidator = [
    param('id')
        .notEmpty().withMessage('ID parameter is required')
        .isMongoId().withMessage('Invalid ID format')
        .custom(providerExists),
    validateErrors
]

export const registerMovement = [
    body('product', 'Product cannot be empty')
        .notEmpty(),
    body('type', 'Type cannot be empty')
        .notEmpty()
        .custom(notRequiredField),
    body('quantity', 'Quantity cannot be empty')
        .notEmpty()
        .isNumeric()
        .withMessage('Must be a Number'),
    body('date', 'Date cannot be empty')
        .notEmpty()
        .isISO8601()
        .withMessage('Date invalid')
        .custom(notRequiredField),
    body('reason', 'Reason cannot be empty')
        .optional()
        .notEmpty(),
    body('destination', 'Destination cannot be empty')
        .optional()
        .notEmpty(),
    body('employee', 'Employe cannot be empty')
        .notEmpty()
        .custom(notRequiredField),
    validateErrors
]

export const registerMovementExit = [
    body('product', 'Product cannot be empty')
        .notEmpty(),
    body('type', 'Type cannot be empty')
        .notEmpty()
        .custom(notRequiredField),
    body('quantity', 'Quantity cannot be empty')
        .notEmpty()
        .isNumeric()
        .withMessage('Must be a Number'),
    body('date', 'Date cannot be empty')
        .notEmpty()
        .isISO8601()
        .withMessage('Date invalid')
        .custom(notRequiredField),
    body('reason', 'Reason cannot be empty')
        .notEmpty(),
    body('destination', 'Destination cannot be empty')
        .notEmpty(),
    body('employee', 'Employe cannot be empty')
        .notEmpty()
        .custom(notRequiredField),
    validateErrors
]

export const updateMovement = [
    body('product', 'Product cannot be empty')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('type', 'Type cannot be empty')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('quantity', 'Quantity cannot be empty')
        .optional()
        .notEmpty()
        .isNumeric()
        .withMessage('Must be a Number'),
    body('date', 'Date cannot be empty')
        .optional()
        .notEmpty()
        .isISO8601()
        .withMessage('Date invalid')
        .custom(notRequiredField),
    body('reason', 'Reason cannot be empty')
        .optional()
        .notEmpty(),
    body('destination', 'Destination cannot be empty')
        .optional()
        .notEmpty(),
    body('employee', 'Employe cannot be empty')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    validateErrorsWithoutFiles
]


export const whitoutIDMovementsProducts = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format')
        .notEmpty()
        .withMessage('ID parameter is required')
        
        .custom(productsExists),
    validateErrors
]
