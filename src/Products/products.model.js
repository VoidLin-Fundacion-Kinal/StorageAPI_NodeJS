import {model, Schema} from "mongoose";

const ProductsSchema = Schema({
    name:{
        type: String,
        required: [true,'Product name is required'],
        trim: true,
        unique: [true, 'Product is already taken'], 
    },
    category:{
        type: String,
        required: true,
        trim: true
    },
    amount:{
        type: Number,
        required: true,
        min:0,
        default:0
    },
    description:{
        type: String,
        trim: true,
    },
    location:{
        type: String,
        trim: true
    },
<<<<<<< Updated upstream
=======
    price:{
        type: Number,
        required: true,
        default: 0,
    },
>>>>>>> Stashed changes
    provider:{
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true
    },
    removed:{
        type: Boolean,
        default: false
    },
    reasonDeleted:{
        type: String,
        default: null,
    },
    deleteFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    deletionDate:{
        type: Date,
        default: null
    },
    },{
        timestamps: true
})

export default model('Products', ProductsSchema)