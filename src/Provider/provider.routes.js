import { Router } from "express"
import { deleteProvider, getAllProviders, saveProvider } from "./provider.controller.js"
import { deleteProviderValidator, providerValidator } from "../../middlewares/validators.js"
import { validateJwt} from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/saveProvider',
            validateJwt,
            providerValidator,
            saveProvider
        )

api.delete('/deleteProvider/:id',
            validateJwt,
            deleteProviderValidator,
            deleteProvider
)

api.get('/getAllProvider', validateJwt,getAllProviders)
export default api