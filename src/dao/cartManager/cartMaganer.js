import CartsModel from "../models/cartsModel.js";
import ProductsModel from "../models/productsModel.js"

export default class CartManager{

    constructor(){
        this.cartModel = CartsModel;
        this.productModel = ProductsModel;
    }

    createCart = async () => {
        try {
            const newCart = await this.cartModel.create({products:[]});
            return newCart;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    getCart = async (cartID) => {
        try {
            const cart = await this.cartModel.findById(cartID);
            if(!cart) {
            throw new Error('No encontrado');
        }
        return cart;
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }

    addToCart = async (cartID, productID) => {
        try{
            const cart = await this.cartModel.findById(cartID);
            if(!cart) {
                throw new Error (`No encontrado`);
            }
            if(!productID) {
                throw new Error ('ID de producto requerido');
            }

            const product = await this.productModel.findById(productID);
            if (!product) {
                throw new Error('Producto no encontrado');
            }

            const existProduct = cart.products.find((item) => item.productId._id.toString() === productID);

            if(existProduct) {
                existProduct.quantity += 1;
            } else {
                cart.products.push({productId: productID, quantity: 1});
            }

            await cart.save();
            return cart;

        } catch (error) {
            throw new Error (`Fallo al obtener los datos`, error.message);
        }
    }

    removeFromCart = async ( cartID, productID) => {
        try{
            const cart = await this.cartModel.findById(cartID);
            if(!cart){
                throw new Error('Carrito no encontrado');
            }
            if(!productID) {
                throw new Error('ProductID es requerido');
            }
            const existProduct = cart.products.find((item) => item.productId === productID);
            if (!existProduct) {
                throw new Error('Producto no encontrado en carrito');
            }

            existProduct.quantity -= 1;
            if(existProduct.quantity === 0) {
                cart.products = cart.products.filter((item) => item.productId !== productID)
            }

            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Fallo remover producto: ${error.message}`)
        }
    }

    updateProductQuantity = async (cartID, productID, quantity) => {
        try {
            const cart = await this.cartModel.findById(cartID);
            if(!cart) {
                throw new Error('Carrito no encontrado')
            }
            if(!productID) {
                throw new Error('ProductoID es requerido')
            }

            const existProduct = cart.products.find((product) => product.product._id === productID);
            if (!existProduct) {
                throw new Error('Producto no encontrado en carrito');
            }
            if(!quantity) {
                throw new Error('Cantidad es requerida');
            }
            existProduct.quantity = quantity;
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Fallo actualizar cantidad de producto: ${error.message}`)
        }
    }

    emptyCart = async (cartID) => {
        try {
            const cart = await this.cartModel.findById(cartID);
            if(!cart){
                throw new Error('Carrito no encontrado')
            }
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`Fallo al vaciar el carrito: ${error.message}`)
        }
    }

    addProductsToCart = async (cartID, products) => {
        try {
            const cart = await this.cartModel.findById(cartID);
            if(!cart){
                throw new Error('Carrito no encontrado');
            }
            if (!products || !Array.isArray(products) || products.length === 0) {
                throw new Error("Lista invalida");
            }

            const existProduct = cart.products.map((item) => item.productId);
            const productsToAdd = [];
            const productsToUpdate = [];

            for (const productData of products) {
                const {productID, quantity} = productData;
                if(!productID){
                    throw new Error("ProductID es requerido");
                }
                if(!quantity || quantity <= 0) {
                    throw new Error("Cantidad invalida");
                }
                const product = await this.productModel.findById(productID);
                if(!product) {
                    throw new Error(`Producto no encontrado: ${productID}`);
                }
                if(existProduct.includes(productID)) {
                    const existProduct = cart.products.find((item) => item.productId === productID);
                    existProduct.quantity += quantity;
                    productsToUpdate.push(existProduct);
                } else {
                    productsToAdd.push({product: product, quantity: quantity});
                }
                cart.products.push(...productsToAdd);
                for (const product of productsToAdd) {
                    await product.save();
                }
                await cart.save();
                return cart;
            }
        }catch (error) {
            throw new Error(`Fallo agregar producto: ${error.message}`)
        }
    }
}

export {CartManager};