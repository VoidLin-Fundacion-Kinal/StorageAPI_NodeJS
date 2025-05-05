
import productsModel from "../Products/products.model.js";
//import { Collection } from "mongoose";


 export const inventoryReport =async (req,res) => {
    try {
        const {limit,skip}=req.query
        const products = await productsModel.find().select('_id name category amount price description')
        .skip(skip)
        .limit(limit)
        let totalStock = 0
        let inventory = 0
    
        products.forEach(product => {
            totalStock += product.amount
            inventory += product.amount * product.price
        })
        return res.send({
            success: true,
            message: "Product's report:",
            products,
            totalStockMessage: `Products in stock: ${totalStock}`,
            inventoryMessage: `Inventory's value: ${inventory}`
          });
          
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'General error with invetoryReport',
            error
        })
    }

} 