import { Router } from "express";
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from "../controller/productsController.js";
import { authToken } from "../utils.js";

const router = Router();

router.get('/', getProducts);
router.get('/:pid', getProductByID);
router.post('/', authToken(true),addProduct);
router.put('/:pid', authToken(true), updateProduct);
router.delete('/:pid', authToken(true), deleteProduct);

export default router;