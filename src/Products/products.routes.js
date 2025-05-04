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

api.post('/products', createProductValidator, createProducts)
api.get('/products', getAllProducst)
api.get('/products/:id', getProductByID,  getProductById)
api.get('/category/:category' ,getProductByCategory)
api.get('/name/:name', getProductByName)
api.get('/date/:createdAt', validateJwt, getProductByDateCreate)
api.put('/products/:id', getProductByID, updateProductValidator,  updateProducts)
api.put('/product/:id', getProductByID,  deleteProductValidator, deleteProduct)

export default api