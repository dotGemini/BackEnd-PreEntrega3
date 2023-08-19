import { Router } from "express";
import { getProducts, getProductByID, addProduct, updateProduct, deleteProduct } from "../controller/productsController.js";
// import { productsUpdated } from "../utils/socketUtils.js";
// import { ProductManager } from "../dao/prodManager/ProductManager.js";

const router = Router();
// const productManager = new ProductManager();

router.get('/', getProducts);
router.get('/:pid', getProductByID);
router.post('/', addProduct);
router.put('/:pid', updateProduct);
router.delete('/:pid', deleteProduct);

/*
router.get('/', async(req, res) => {
    try {
        const {limit} = parseInt(req.query);
        const page = req.query.page;
        const sort = req.query.sort;
        const query = req.query.query;
        const prod = await productManager.getProducts(limit, page, sort, query);
        res.send({status:1, products: prod});
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.get('/:pid', async (req, res) => {
    try {
        const prodID = req.params.pid
        const prod = await productManager.getProductByID(prodID);
        res.send(prod);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.post('/', async (req, res) =>{
    try{
        const body = req.body;
        await productManager.addProduct(body);
        productsUpdated(req.app.get('io'));
        res.send("Producto Agregado");
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }

})

router.put("/:pid", async (req, res) =>{
    try{
        const prodID = req.params.pid;
        const newObject = req.body;
        await productManager.updateProduct(prodID, newObject);
        productsUpdated(req.app.get('io'));
        res.send("Producto actualizado");
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})

router.delete("/:pid", async (req, res) => {
    try{
        const prodID = req.params.pid;
        const prodDelete = await productManager.deleteProduct(prodID);
        if(!prodDelete){
            productsUpdated(req.app.get('io'));
            res.send("Eliminado")
        }else{
            res.send("No existe")
        }
    }catch(error){
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
})*/

export default router;