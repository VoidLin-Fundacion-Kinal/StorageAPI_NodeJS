import { Schema, model } from "mongoose";

const clientSchema =Schema(
    {
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
        company:{
            type:String,
            required:[true,'Company is required']
        },
                //Correo
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: [true, 'Email is already taken']
        },
        phone:{
            type:String,
            required:[true,'Phone is required'],
            unique:[true,'Phone number is already registered']
        }
    }
)

export default model('Client',clientSchema)