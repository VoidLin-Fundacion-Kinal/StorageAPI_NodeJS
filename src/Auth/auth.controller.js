import User from '../User/user.model.js';
import {checkPassword, encrypt} from '../../utils/encrypt.js'
import {generateJwt} from '../../utils/jwt.js'


//Registrar nuevo Usuario
export const register = async(req, res) => {
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'EMPLOYEE'
        await user.save()
        
        return res.send(
            {
                message: `Registered successfully, can be login with username: ${user.username}`
            }
        )
    }catch (error){
        console.error(error)
        return res.status(500).send(
            {
                message: `Error registering user`,
                error
            }
        )
    }
}

//Inicio de Sesión
export const login = async(req, res) => {
    try{
        let {
            userLogin,
            password
        } = req.body

        let user = await User.findOne(
            {
                $or: [
                    {email: userLogin},
                    {username: userLogin}
                ]
            }
        )

        if (user && await checkPassword(user.password, password)){

            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }

            let token = await generateJwt(loggedUser)

            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token  
                }
            )
        }

        return res.status(401).send(
            {
                message: `Invalid credentials`
            }
        )


    }catch(error){
        console.error(error)
        return res.status(500).send(
            {
                message: 'General error with login function',
                error: error.message
            }
        )
    }
}