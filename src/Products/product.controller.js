import Products from "./products.model.js"
import User from "../User/user.model.js"
import Provider from "../Provider/provider.model.js"

//Create Product
export const createProducts = async (req, res) => {
    try{
        const data = req.body

        // Validate that the Provider exist
        const providerExist = await Provider.findById(data.provider)
        if (!providerExist) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found'
            })
        }

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
        const products = await Products.find()
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
        
        
        if(!products){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
1       
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
        const products = await Products.find({ category })
            .populate("provider")
        
        
        if(!products.length){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
1       
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
        const products = await Products.find({ name })
            .populate("provider")
        
        
        if(!products.length){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
1       
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
        const products = await Products.find({ createdAt })
            .populate("provider")
        
        
        if(!products.length){
            return res.status(404).send({
                success: false,
                message: 'Products not found'
            })
        }
1       
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

        if(!data.provider){
        const providerExist = await Provider.findById(data.provider)
        if (!providerExist) {
            return res.status(404).send({
                success: false,
                message: 'Provider not found'
            })
        }
    }
    const duplicate = await Products.findOne({ name: data.name, _id: { $ne: id } })
        if (duplicate) {
            return res.status(400).send({
                success: false,
                message: 'Another product with the same name already exists'
            });
        }
        const forbiddenAttributes = [
            'removed', 
            'reasonDeleted', 
            'deleteFrom', 
            'deletionDate'
        ];
        
        const forbiddenInRequest = forbiddenAttributes.filter(attr => attr in data);
        
        if (forbiddenInRequest.length > 0) {
            return res.status(403).send({
                success: false,
                message: `Forbidden attributes: ${forbiddenInRequest.join(', ')}`
            });
        }  

    // Update Product
    const updateProducts = await Products.findByIdAndUpdate(
        id,
        data,
        { new:true }
    ).populate("provider")

    if(!updateProducts){
        return res.status(404).send({
            success: false,
            message: 'Product not found and not update'
        })
    }
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

// "Delete Products"
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const { reasonDeleted, deleteFrom } = data

        // Validate prohibited fields for this operation
        const forbiddenAttributes = [
            'name', 
            'category', 
            'amount', 
            'description', 
            'location',
            'provider'
        ]
        const forbiddenInRequest = forbiddenAttributes.filter(attr => attr in data)
        if (forbiddenInRequest.length > 0) {
            return res.status(403).send({
                success: false,
                message: `Forbidden attributes: ${forbiddenInRequest.join(', ')}`
            })
        }

        // Check if the product exists
        const product = await Products.findById(id);
        if (!product) {
            return res.status(404).send({
                success: false,
                message: 'Product not found'
            })
        }

        // Validate that the deleting user exists
        const userExist = await User.findById(deleteFrom)
        if (!userExist) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        // Check that there is no other product with the same name (in case they sent that field incorrectly)
        const duplicate = await Products.findOne({ name: data.name, _id: { $ne: id } });
        if (duplicate) {
            return res.status(400).send({
                success: false,
                message: 'Another product with the same name already exists'
            });
        }

        // Validate justification and deleteFrom are not empty
        if (!reasonDeleted || typeof reasonDeleted !== 'string' || reasonDeleted.trim() === '') {
            return res.status(400).send({
                success: false,
                message: 'Deletion reason is required and cannot be empty'
            })
        }

        // Logically eliminate the product
        product.removed = true
        product.reasonDeleted = reasonDeleted.trim()
        product.deletionDate = new Date()
        product.deleteFrom = deleteFrom;

        await product.save()

        return res.send({
            success: true,
            message: 'Product deleted logically',
            product
        })

    } catch (err) {
        console.error('Error deleting product logically', err)
        return res.status(500).send({
            success: false,
            message: 'Internal server error',
            err
        })
    }
}
