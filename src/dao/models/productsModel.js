import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
const { Schema } = mongoose;

export const productsCollection = 'products';

const productsSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: async function(value) {
                const count = await mongoose.models[productsCollection].countDocuments({code:value});
                return count == 0;
            },
            message: 'El codigo ya esta usado'
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'No puede ser negativo']
        },
        status: {
            type: Boolean,
            default: true,
        },
        stock: {
            type: Number,
            required: true,
            min: [0, 'No puede ser negativo']
        },
        category: {
            type:String,
            required: true
        },
        url: {
            type: [String],
            default: []
        }
    }
});

productsSchema.plugin(mongoosePaginate);

const ProductsModel = mongoose.model(productsCollection, productsSchema);

export default ProductsModel;