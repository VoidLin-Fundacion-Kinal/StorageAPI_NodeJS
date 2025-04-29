'use strict'

import {
    checkPassword,
    encrypt
} from '../../utils/encrypt.js'

import User from './user.model.js'

/*Observación: Colocar comentario de la función a crear. */

//Update Usuario
export const updateUser = async(req, res) => {
    try{
        const {id} = req.params

        const data = req.body

        const idC = req.user.uid

        const userC = await User.findById(id)

        if(userC._id.toString() !== idC){
            return res.status(403).send(
                {
                    success: false,
                    message: 'You cannot update the profile of others'
                }
            )
        }

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update){
            return res.status(404).send(
                {
                    success: false,
                    message: 'User not found'
                }
            )
        }

        return res.send(
            {
                success: true,
                message: 'User updated successfully',
                user: update
            }
        )

    }catch (error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'Internal server error',
                error
            }
        )
    }
}

//Update Password
export const updatePassword = async(req, res) => {
    try{

        let id = req.user.uid
        
        let {oldPassword, newPassword} = req.body
        
        let user = await User.findById(id)

        if(user && await checkPassword(user.password, oldPassword)){
            user.password = await encrypt(newPassword)
            user.save()
            return res.send(
                {
                    success: true,
                    message: 'Updated Password Successfully'
                }
            )
        }

        return res.send(
            {
                success: false,
                message: 'Incorrect Password'
            }
        )

    }catch (error){
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General Error'
            }
        )
    }
}

//Delete User
export const deleteUser = async(req, res) => {
    try{
        let idC = req.user.uid
        let password = req.body.password 
        let {id} = req.params
        const userC = await User.findById(id)
        
        if(!userC) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        
        if(userC._id.toString() !== idC){
            return res.status(403).send({
                success: false,
                message: 'You cannot delete the profile of others.'
            })
        }
        
        if(await checkPassword(userC.password, password)){
            await User.findByIdAndDelete(id)
            return res.send({
                success: true, 
                message: 'User deleted successfully'
            })
            
        } else {
            return res.status(401).send({
                success: false,
                message: 'Incorrect password'
            })
        }
    } catch(error){
        console.error(error)
        return res.status(500).send({
            success: false,
            message: 'General error'
        })
    }
}


/* =========================================================================================================*/
/* ==========================INITUSER========================================= */
/* =========================================================================================================*/

//Perfil al Iniciar base de datos
const initUser  = async () => {
    try {
        const adminExist = await User.findOne({ role: 'ADMIN' }) 

        if (!adminExist) {
            const password = await encrypt('Alfred@88917', 10) 

            const userAdmin = new User({
                name: 'Rene',
                surname: 'López', 
                username: 'rlopez',
                email: 'rlopez@gmail.com',
                password: password,
                phone: '47491420',
                role: 'ADMIN',
            }) 

            await userAdmin.save() 
            console.log('Admin created') 
        } else {
            console.log('Admin already exists') 
        }
    } catch (error) {
        console.error('Error, not Admin created', error) 
    }
} 

//Llamar a la función initUser
initUser()