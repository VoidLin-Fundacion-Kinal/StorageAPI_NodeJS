import {Schema, model} from 'mongoose'

const userSchema = Schema(
    {
        //Nombre
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },

        //Apellido
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },

        //Correo
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already taken']
        },

        //SobreNombre
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'], 
            lowercase: true,
            maxLength: [15, `Can't be overcome 15 characters`]
        },

        //Contraseña
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },

        //Teléfono
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, `Can't be overcome 8 characters`],
            maxLength: [15, 'Phone must be 15 numbers'],
        },

        //Rol
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN','EMPLOYEE']
        },
    }
)

export default model('User', userSchema)