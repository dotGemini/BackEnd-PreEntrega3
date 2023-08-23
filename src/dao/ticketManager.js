import TicketsModel from "./models/ticketModel.js";
import ProductManager from "./prodManager/ProductManager.js";
import CartManager from "./cartManager/cartMaganer.js";

export default class TicketManager{
    constructor(){
        this.ticketModel = TicketsModel;
        this.cartManager = new CartManager();
        this.productManager = new ProductManager();
    }

    createTicket = async (cartId, email) => {
        try{
            const cart = await this.cartManager.getCart(cartId);
            let totalPrice = 0;
            
            for (const p of cart.products) {

                const product = await this.productManager.getProductByID(p.productId.id);
                if(p.quantity > product.stock){
                    throw new Error('Stock insuficiente para un producto en el carrito');
                }
                let newStock = product.stock - p.quantity
                product.stock = newStock
                //this.productManager.updateProduct(p.productId.id, product)    //comentado por pruebas

                let prodTotalPrice = product.price * p.quantity;
                totalPrice += prodTotalPrice;
            }

            let autoCode = String(Math.floor(Math.random())*1234567890)
            const ticketBody = {
                        code: autoCode,
                        amount: totalPrice,
                        purchaser: email,
                    }
            const newTicket = await this.ticketModel.create(ticketBody)
            // await this.cartManager.emptyCart(cartId)                    //comentado por pruebas
            return newTicket;

        } catch(error){
            throw new Error(error.message)
        }
    }
}

export {TicketManager};