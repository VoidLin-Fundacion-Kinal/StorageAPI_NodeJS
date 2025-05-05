import Products from "./products.model.js"
import User from "../User/user.model.js"
import Provider from "../Provider/provider.model.js"

//Create Product
export const createProducts = async (req, res) => {
    try{
        const data = req.body
        const products = new Products(data)
        await products.save()
        
        return res.send({
            success: true,
            message: 'Products created succesfully',
            products
        })

    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Get all Products
export const getAllProducst = async (req, res) => {
    try{
        const  { limit = 20, skip = 0} = req.query
        const products = await Products.find({removed: false})
            .populate("provider")
            .skip(Number(skip))
            .limit(Number(limit))

            if (products.length ===0){
                return res.status(404).send({
                    success: false,
                    message: 'Products not found'
                })
            }
            return res.send({
                success: true,
                message: 'Products found',
                products
            })

    } catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Get by Id Product
export const getProductById = async (req, res) => {
    try{
        const { id } = req.params
        const products = await Products.findById(id)
            .populate("provider")
     
        return res.send({
            success: true,
            message: 'Products found',
            data: products
        })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Filter by Category
export const getProductByCategory = async (req, res) => {
    try{
        const { category } = req.params;
        const products = await Products.find({ category ,removed: false})
            .populate("provider")

        if(!products){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
        
        return res.send({
            success: true,
            message: 'Products found',
            data: products
        })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Filter by Name
export const getProductByName= async (req, res) => {
    try{
        const { name } = req.params;
        const products = await Products.find({ name , removed: false})
            .populate("provider")

        if(!products){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
   
        return res.send({
            success: true,
            message: 'Products found',
            data: products
        })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

// Filter by Date Create
export const getProductByDateCreate= async (req, res) => {
    try{
        const { createdAt } = req.params;
        const products = await Products.find({ createdAt ,removed: false})
            .populate("provider")
        
        if(!products.length){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }       
        return res.send({
            success: true,
            message: 'Products found',
            data: products
        })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
// Update Products normally
export const updateProducts = async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body
  
    // Update Product
    const updateProducts = await Products.findByIdAndUpdate(
        id,
        data,
        { new:true }
    ).populate("provider")

    return res.send({
        success: true,
        message: 'Product update succesfullt',
        products: updateProducts
    })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
export const deleteProduct = async(req, res) => {
    try{
        const { id } = req.params
        const data = req.body

        const {user} = req

        const product = await Products.findById(id)

        product.removed = true
        product.deleteFrom = user.uid
        product.deletionDate = Date.now()
        product.save()
   
    // Update Product
        const deleteProduct = await Products.findByIdAndUpdate(
        id,
        data,
        { new:true }
        ).populate("deleteFrom")

    return res.send({
        success: true,
        message: 'Product deleted succesfullt',
        products: deleteProduct
    })
    }catch (err) {
        console.error('General error', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
