import { Router } from 'express'
import { 
        createProducts, 
        getAllProducst, 
        getProductById,
        getProductByCategory,
        getProductByDateCreate,
        getProductByName,
        updateProducts,
        deleteProduct
    } from './product.controller.js'
import {
        validateJwt
    } from '../../middlewares/validate.jwt.js'
import { 
        createProductValidator, 
        updateProductValidator,
        deleteProductValidator, 
        getProductByID
    } from "../../middlewares/validators.js"
  

const api = Router()

api.post('/products', validateJwt,  createProductValidator, createProducts)
api.get('/products', validateJwt,  getAllProducst)
api.get('/products/:id', getProductByID,  getProductById)
api.get('/category/:category', validateJwt, getProductByCategory)
api.get('/name/:name', validateJwt,  getProductByName)
api.get('/date/:createdAt', validateJwt,  validateJwt, getProductByDateCreate)
api.put('/products/:id', validateJwt,  getProductByID, updateProductValidator,  updateProducts)
api.put('/product/:id', validateJwt,  getProductByID,  deleteProductValidator, deleteProduct)

export default api