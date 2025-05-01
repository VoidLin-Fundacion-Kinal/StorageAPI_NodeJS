'use strict'

//ECModules | ESModules


import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import authRoutes from '../src/Auth/auth.routes.js'
import userRoutes from '../src/User/user.routes.js'
import providerRoutes from '../src/Provider/provider.routes.js'

const configs = (app) => {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app) => {
    /*Se agrega Rutas de los Modelos 
    OBSERVACIÓN: Agregar un comentario antes de las rutas, asi mismo para identificar.*/

    //Rutas de Autenticación
    app.use(authRoutes)
    app.use('/v1/user', userRoutes)
    app.use('/v1/provider', providerRoutes)

}

export const initServer = () => {
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`);

    }catch (error){
        
        console.error('Error en el Servidor', error)
    }
}

/* Cumplir los requirimientos a la hora de agregar nuevas rutas, asi mismo para evitar complicaciones a futuros*/
