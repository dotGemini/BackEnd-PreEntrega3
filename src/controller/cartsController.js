import { CartsService } from "../services/cartsService.js";
const cartService = new CartsService();

export const createCart = (req, res) => {       //post '/'
    res.send(cartService.createCart());
}

export const getCart = (req, res) => {      //get '/:cid'
    res.send(cartService.getCart(req.params.cid));
}

export const addProductsToCart = (req, res) => {        //put '/:cid'
    const cartID = req.params.cid;
    const products = req.body.products;
    res.send(cartService.addProductsToCart(cartID, products));
}

export const emptyCart = (req, res) => {        //delete '/:cid'
    res.send(cartService.emptyCart(req.params.cid));
}

export const addToCart = (req, res) => {        //post '/:cid/product/:pid'
    const cartID = req.params.cid;
    const prodID = req.params.pid;
    res.send(cartService.addToCart(cartID, prodID));
}

export const updateProductQuantity = (req, res) => {        //put '/:cid/product/:pid'
        const cartID = req.params.cid;
        const productID = req.params.pid;
        const quantity = req.body.quantity;
        res.send(cartService.updateProductQuantity(cartID, productID, quantity));
}

export const removeFromCart = (req, res) => {       //delete '/:cid/product/:pid'
        const cartID = req.params.cid;
        const productID = req.params.pid;
        res.send(cartService.removeFromCart(cartID, productID));
}