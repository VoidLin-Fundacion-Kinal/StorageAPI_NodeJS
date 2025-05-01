import Provider from "./provider.model.js"

export const saveProvider = async(req, res)=>{
    const data = req.body
    try {
        const provider = new Provider(data)
        await provider.save()

        return res.send(
            {
                success:true,
                message:'Provider saved sucessfully'
            }
        )        
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding provider',
                e
            }
        )
    }
}

export const deleteProvider = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProvider = await Provider.findByIdAndDelete(id);
      
        if (!deletedProvider) {
            return res.status(404).json({
                success: false,
                message: 'Provider not found'
            })
        }

        return res.json({
            success: true,
            message: 'provider successfully deleted',
            provider: deletedProvider
        })

    } catch (e) {
        console.error('Error deleting provider:', e)

        return res.status(500).json({
            success: false,
            message: 'Error deleting the provider',
            e
        })
    }
}

export const getAllProviders = async (req, res) => {
    const { limit = 10, skip = 0 } = req.query
    try {
        const providers = await Provider.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .select('-__v -createdAt -updatedAt')
            
        if (providers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No providers found'
            })
        }

        return res.json({
            success: true,
            message: 'Providers retrieved successfully',
            total: providers.length,
            providers
        })

    } catch (e) {
        console.error('Error getting providers:', e);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching providers',
            e
        })
    }
}