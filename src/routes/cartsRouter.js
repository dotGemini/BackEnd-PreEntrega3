import { Router } from "express";
import { createCart, getCart, addProductsToCart, emptyCart, addToCart, updateProductQuantity, removeFromCart } from "../controller/cartsController.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
}

const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

router.post('/', createCart);

router.get('/:cid', getCart);
router.put('/:cid', addProductsToCart);
router.delete('/:cid', emptyCart);

router.post('/:cid/product/:pid', addToCart);
router.put('/:cid/product/:pid', updateProductQuantity);
router.delete('/:cid/product/:pid', removeFromCart);

export default router;