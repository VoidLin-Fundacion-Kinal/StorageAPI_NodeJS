'use strict'


import Movement from './movement.model.js'
import User from '../User/user.model.js'
import Product from '../Products/products.model.js'

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
export const addmovementExit = async(req,res)=>{
    try {
        let data = req.body

        let {product, quantity} = req.body

        let userT = req.user

        let user = await User.findById(userT.uid)

        let productSave = await Product.findById(product)

        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message: `User don't found`
                }
            )
        }
         if(!productSave){
            return res.status(404).send(
                {
                    success: false,
                    message: `Product don't found`
                }
            )
        }

        let movement = new Movement(data)

        if(quantity > productSave.amount){
            return res.status(400).send(
                {
                    success: false,
                    message: `Quantity cannot be greater thant the stock in Products`
                }
            )
        }else if(Number.isInteger(quantity)){
            return res.status(400).send(
                {
                    success: false,
                    message: `Please enter a number`
                }
            )
        }

        /* let newStock = productSave.amount - quantity */

        movement.date = Date.now()

        movement.type = 'salida'

        movement.employee = userT.uid

        await Product.updateOne({_id: product},{$inc:{amount: -quantity}})

        await movement.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Inventory Movement registered successfully'
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with registering movement', error
            }
        )
    } 
}


export const addmovement = async(req,res)=>{
    try {
        let data = req.body

        let {product, quantity} = req.body

        let userT = req.user

        let user = await User.findById(userT.uid)

        let productSave = await Product.findById(product)

        if(!user){
            return res.status(404).send(
                {
                    success: false,
                    message: `User don't found`
                }
            )
        } 
        if(!productSave){
            return res.status(404).send(
                {
                    success: false,
                    message: `Product don't found`
                }
            )
        }

        let movement = new Movement(data)

        if(Number.isInteger(quantity)){
            return res.status(400).send(
                {
                    success: false,
                    message: `Please enter a number`
                }
            )
        }

         /* let newStock = productSave.amount + quantity  */

        movement.date = Date.now()

        movement.type = 'entrada'

        movement.employee = userT.uid

        await Product.updateOne({_id: product},{$inc:{amount: quantity}})

        await movement.save()

        return res.status(201).send(
            {
                success: true,
                message: 'Inventory Movement registered successfully'
            }
        )
        
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with registering movement', error
            }
        )
    } 
}


export const getMovements = async(req,res)=>{
    try {
        let movement = await Movement.find().populate('product','name -_id').populate('employee','name')

        if(movement.length === 0){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Historial of Inventory Movements not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Historial of Inventory Movements Found:',
                movement
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )
    }
}

export const getMovemetsWithID = async(req,res)=>{
    try {
        let {id} = req.params

        let movement = await Movement.findById(id).populate('product','name -_id').populate('employee','name')

        if(movement.length === 0){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Inventory Movement not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Movement Found:',
                movement
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )
    }
}

export const historialProducts = async(req,res)=>{
    try {
        let movement = await Movement.find().populate('product','name -_id').sort({type: 1}).populate('employee','name')

        if(movement.length === 0){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Inventory Movement not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Historial of products',
                movement
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )
    }

}

export const historialProductsById = async(req,res)=>{
    try {

        let {id} = req.params 

        let movement = await Movement.find({product: {$eq:id}}).populate('product','name -_id').sort({type: 1}).populate('employee','name')

        if(movement.length === 0){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Inventory Movement not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Historial of products',
                movement
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )
    }

}

export const updateInventoryMovement = async(req,res)=>{
    try {
        let data = req.body

        let {quantity} = req.body

        let {id} = req.params

        let movement = await Movement.findById(id)

        


        if(!movement){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Movement not found'
                }
            )
        }

        let productSaved = await Product.findById(movement.product)
        
        if(!productSaved){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Product not found'
                }
            )
        }
        let {type} = movement
        if(quantity){
            switch(type){
                case 'salida':
                    /* if(quantity >= (productSaved.amount + movement.quantity)) return res.status(400).send({success: false, message:'Quantity cannot be more than '+ productSaved.amount + movement.quantity})  */
                    await Product.updateOne({_id: movement.product},{$inc:{amount: movement.quantity}})
                    await Movement.findByIdAndUpdate(id,data,{new:true})
                    await Product.updateOne({_id: movement.product},{$inc:{amount: -quantity}})
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(exit) updated successfully',
                            movement
                        }
                    )
                    break;
                case 'entrada':
                    await Product.updateOne({_id: movement.product},{$inc:{amount: -movement.quantity}})
                    await Movement.findByIdAndUpdate(id,data,{new:true})
                    await Product.updateOne({_id: movement.product},{$inc:{amount: quantity}})
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(entrance) updated successfully',
                            movement,
                        }
                    )
                    break;
            }
        }

        await Movement.findByIdAndUpdate(id,data,{new:true})

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Movement updated successfully',
                movement
            }
        )

    } catch (error) {
        return res.status(500).send(
            {
                message: 'General error with  movements', error
            }
        )  
    }

}

export const deleteInventoryMovement = async(req,res)=>{
    try {
        let {id} = req.parmas
        
        let movement = await Movement.findByIdAndDelete(id)

        if(!movement){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Inventory Movement not found'
                }
            )
        }

        return res.status(200).send(
            {
                success: true,
                message: 'Inventory Movement deleted successfully'
            }
        )
        //(validaciones)

    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with registering movement', error
            }
        )
    }
}

export const withoutId = async(req,res)=>{
    try {
        return res.status(400).send(
            {
                success: false,
                message: 'Enter an Id'
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with registering movement', error
            }
        )
    }
}

