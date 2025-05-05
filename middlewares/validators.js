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
    productExists,
    deleteFrom
} from '../utils/db.validators.js'

import Client from '../src/Client/client.model.js'

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
    body('removed')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('reasonDeleted')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('deleteFrom')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
    body('deletionDate')
        .optional()
        .notEmpty()
        .custom(notRequiredField),    
    validateErrors
]

/**
 * Validations for updating a product
 */

export const updateProductValidator = [
    body('name')
        .optional()
        .trim()
        .notEmpty().withMessage('Product name cannot be empty')
        .custom(productNameExists),
    body('category')
        .optional()
        .trim()
        .notEmpty().withMessage('Category cannot be empty'),
    body('amount')
        .optional()
        .isFloat({ min: 0 }).withMessage('Amount must be zero or greater'),
    body('price')
        .optional()
        .isFloat({ min: 0 }).
        withMessage('Price must be zero or greater'),
    body('description')
        .optional().
        trim(),
    body('location')
        .optional()
        .trim(),
    body('provider')
        .optional()
        .custom(notRequiredField),
    body('removed')
        .optional()
        .custom(notRequiredField),
    body('reasonDeleted')
        .optional()
        .custom(notRequiredField),
    body('deleteFrom')
        .optional()
        .custom(notRequiredField),
    body('deletionDate')
        .optional()
        .custom(notRequiredField),
    validateErrors
];
/**
 * Validations for deleting a product
 */
export const deleteProductValidator = [
    body('name')
        .optional()
        .custom(notRequiredField),
    body('category')
        .optional()
        .custom(notRequiredField),
    body('amount')
        .optional()
        .custom(notRequiredField),
    body('price')
        .optional()
        .custom(notRequiredField),
    body('description')
        .optional()
        .custom(notRequiredField),
    body('location')
        .optional()
        .custom(notRequiredField),
    body('provider')
        .optional()
        .custom(notRequiredField),
    body('removed')
        .notEmpty()
        .withMessage('Removed field is required')
        .isBoolean()
        .withMessage('Removed must be a boolean'),
    body('reasonDeleted')
         .notEmpty()
        .withMessage('Reason for deletion is required')
        .isString()
        .withMessage('Reason must be a string'),
    body('deleteFrom')
        .notEmpty()
        .withMessage('deleteFrom is required')
        .isMongoId()
        .withMessage('Invalid User ID')
        .custom(deleteFrom),
    body('deletionDate')
        .notEmpty()
        .withMessage('deletionDate is required')
        .isISO8601()//Verifica que sea fecha estandar internacional
        .withMessage('deletionDate must be a valid date'),
    validateErrors
]
export const getProductByID = [
    param('id')
        .notEmpty().withMessage('Product ID is required')
        .isMongoId().withMessage('Invalid product ID')
        .custom(productExists),
    validateErrors
]

export const clientValidator = [
    body('name')
    .notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('surname is requried'),
    body('company').notEmpty().withMessage('company is requried'),
    body('email').isEmail().notEmpty().withMessage('email is requried'),
    body('phone').notEmpty().withMessage('Phone is requried'),
    validateErrorsWithoutFiles
]

export const clientValidatorId = [
    param('id').custom(async (id) => {
        if(!mongoose.Types.ObjectId.isValid(id)){
            return Promise.reject('Invalid client ID format')
        }

        const client = await Client.findById(id)
        if (!client) {
            return Promise.reject('Client does not exist')
        }
    }),
    validateErrorsWithoutFiles
]

//InventoryMovement
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
        .notEmpty()
        .custom(notRequiredField),
    body('destination', 'Destination cannot be empty')
        .optional()
        .notEmpty()
        .custom(notRequiredField),
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
        
        .custom(productExists),
    validateErrors
]
