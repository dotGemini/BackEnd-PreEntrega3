import { CartManager } from "../dao/cartManager/cartMaganer.js";

export class CartsService {
    constructor() {
        this.cartDao = new CartManager();
    }

    async createCart() {        //post '/'
        return await this.cartDao.createCart();
    }

    async getCart(cartID) {     //get '/:cid'
        return await this.cartDao.getCart(cartID);
    } 

    async addProductsToCart(cartID, products) {
        return await this.cartDao.addProductsToCart(cartID, products);
    }

    async emptyCart(cartID) {
        return await this.cartDao.emptyCart(cartID);
    }

    async addToCart(cartID, prodID) {
        return await this.cartDao.addToCart(cartID, prodID);
    }

    async updateProductQuantity(cartID, prodID, quantity){
        return await this.cartDao.updateProductQuantity(cartID, prodID, quantity);
    }

    async removeFromCart(cartID, prodID) {
        return await this.cartDao.removeFromCart(cartID, prodID);
    }
}