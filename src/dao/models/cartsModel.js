import mongoose from "mongoose";

const cartsCollection = 'carts';

const cartsSchema = new mongoose.Schema({
    products: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'products',
                    required: true
                },
                quantity: {
                    type: Number,
                    default: 0,
                    min: 0
                }
            }
        ],
        default: []
    }
});


cartsSchema.pre('findOne', function() {
    this.populate('products.productId');
});

cartsSchema.pre('save', function() {
    this.populate('products.productId');
});

const CartsModel = mongoose.model(cartsCollection, cartsSchema);

export default CartsModel;