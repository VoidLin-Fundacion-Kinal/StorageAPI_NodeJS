import { model, Schema } from 'mongoose'

const providerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            unique: true
        },
        surname: {
            type: String,
            required: [true, 'Surname is required']
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        // products: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'Product'
        // }]
    },
    {
        versionKey: false, 
        timestamps: true 
    }
)

providerSchema.methods.toJSON = function(){
    const { __v, ...provider } = this.toObject() 
    return provider
}

export default model('Provider', providerSchema)