import { model, Schema } from "mongoose";

const movementSchema = Schema(
    {
        product:{
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        type:{
            type:String,
            enum:['entrada', 'salida'],
            required:true
        },
        quantity:{
            type: Number,
            requred: true
        },
        date:{
            type: Date,
            required: true
        },//solo para salida
        reason:{
            type: String
        },//solo para salida
        destination: {
            type:String
        },
        employee:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

export default model('Movement', movementSchema)