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
    nameExistProvider,
    notRequiredField,
    providerExists,
    productNameExists,
    productExists
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


/**
 * Validations for creating a product
 */
export const createProductValidator = [
    body('name', 'Product name cannot be empty')
        .notEmpty()
        .trim()
        .custom(productNameExists),
    body('category', 'Category cannot be empty')
        .notEmpty()
        .trim(),
    body('amount', 'Amount must be a number and cannot be negative')
        .notEmpty()
        .isNumeric()
        .withMessage('Amount must be a number')
        .isFloat({ min: 0 })
        .withMessage('Amount must be zero or greater'),
    body('description')
        .optional()
        .trim(),
    body('location')
        .optional()
        .trim(),
    body('provider', 'Provider ID is required')
        .notEmpty()
        .isMongoId()
        .withMessage('Invalid provider ID')
        .custom(providerExists),
    validateErrors
]

/**
 * Validations for updating a product
 */
export const updateProductValidator = [
    param('id')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID')
        .custom(productExists),
    body('name')
        .optional()
        .notEmpty()
        .trim(),
    body('category')
        .optional()
        .notEmpty()
        .trim(),
    body('amount')
        .optional()
        .isNumeric()
        .withMessage('Amount must be a number')
        .isFloat({ min: 0 })
        .withMessage('Amount must be zero or greater'),
    body('description')
        .optional()
        .trim(),
    body('location')
        .optional()
        .trim(),
    body('provider')
        .optional()
        .isMongoId()
        .withMessage('Invalid provider ID')
        .custom(providerExists),
    validateErrors
]

/**
 * Validations for deleting a product
 */
export const deleteProductValidator = [
    param('id')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID')
        .custom(productExists),
    validateErrors
]