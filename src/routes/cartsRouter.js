import { Router } from "express";
import { createCart, getCart, addProductsToCart, emptyCart, addToCart, updateProductQuantity, removeFromCart } from "../controller/cartsController.js";
import { createTicket } from "../controller/ticketsController.js";
import { authToken } from "../utils.js";

const router = Router();

router.post('/', createCart);

router.get('/:cid', getCart);
router.put('/:cid', addProductsToCart);
router.delete('/:cid', emptyCart);

router.post('/:cid/product/:pid', authToken(false),addToCart);
router.put('/:cid/product/:pid', authToken(false),updateProductQuantity);
router.delete('/:cid/product/:pid', authToken(false),removeFromCart);

router.post('/:cid/purchase', authToken(false), createTicket);

export default router;