'use strict'


import Movement from './movement.model.js'
import User from '../User/user.model.js'
import Product from '../Products/product.model.js'

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
export const addmovementExit = async(req,res)=>{//Hacer validaciones para register
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
        }else if(!productSave){
            return res.status(404).send(
                {
                    success: false,
                    message: `Product don't found`
                }
            )
        }

        let movement = new Movement(data)

        if(quantity > productSave.amount){
            return res.status(500).send(
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

        await productSave.updateOne({_id: productSave._id},{$inc:{amount: -quantity}})

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

export const addmovement = async(req,res)=>{//Hacer validaciones para register
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
        }else if(!productSave){
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

        /* let newStock = productSave.amount + quantity */

        movement.date = Date.now()

        movement.type = 'entrada'

        await productSave.updateOne({_id: productSave._id},{$inc:{amount: quantity}})

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
        let movement = Movement.find().populate('product','name -_id')

        if(!movement){
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
                message: 'General error with registering movement', error
            }
        )
    }
}

export const getMovemetsWithID = async(req,res)=>{
    try {
        let {id} = req.params

        let movement = Movement.findById(id).populate('product','name -_id')

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
                message: 'Inventory Movement Found:',
                movement
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

export const historialProducts = async(req,res)=>{
    try {
        let movement = Movement.find().populate('product','name -id').sort({type: 1})

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
                message: 'Historial of products',
                movement
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
    //buscar por movimiento y usar populate para los productos y ordenar con sort, el campo de type ya sea con 1 o -1(hacer validaciones)

}

export const updateInventoryMovement = async(req,res)=>{
    try {
        let data = req.body

        let {quantity} = req.body

        let {id} = req.params

        let movement = Movement.findById(id)

        let productSaved = await Product.findById(movement.product)

        if(!movement){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Movement not found'
                }
            )
        }else if(!productSaved){
            return res.status(404).send(
                {
                    success:false,
                    message: 'Product not found'
                }
            )
        }

        if(quantity){
            switch(type){
                case 'salida':
                    await productSaved.updateOne({_id: productSaved._id},{$inc:{amount: movement.quantity}})
                    await movement.findByIdAndUpdate(id,data,{new:true})
                    await productSaved.updateOne({_id: productSaved._id},{$inc:{amount: -quantity}})
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(exit) updated successfully',
                            movement
                        }
                    )
                    break;
                case 'entrada':
                    await productSaved.updateOne({_id: productSaved._id},{$inc:{amount: -movement.quantity}})
                    await movement.findByIdAndUpdate(id,data,{new:true})
                    await productSaved.updateOne({_id: productSaved._id},{$inc:{amount: quantity}})
                    return res.status(200).send(
                        {
                            success: true,
                            message: 'Inventory Movement(entrance) updated successfully',
                            movement
                        }
                    )
                    break;
            }
        }

        await movement.findByIdAndUpdate(id,data,{new:true})

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
                message: 'General error with registering movement', error
            }
        )  
    }
//hacer update y validar con un if si viene amount o no, si si viene verificar si viene entrada o salida con otro if o switch y sumarle o restarle al stock del producto dependiendo que sea(hacer validaciones)
}

export const deleteInventoryMovement = async(req,res)=>{
    try {
        let {id} = req.parmas
        
        let movement = Movement.findByIdAndDelete(id)

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

