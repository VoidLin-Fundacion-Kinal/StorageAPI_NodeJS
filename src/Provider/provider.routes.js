import { Router } from "express"
import { deleteProvider, getAllProviders, saveProvider } from "./provider.controller.js"
import { deleteProviderValidator, providerValidator } from "../../middlewares/validators.js"

const api = Router()

api.post('/saveProvider',
            providerValidator,
            saveProvider
        )

api.delete('/deleteProvider/:id',
            deleteProviderValidator,
            deleteProvider
)

api.get('/getAllProvider', getAllProviders)
export default api