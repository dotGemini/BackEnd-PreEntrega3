import { ProductsService } from "../services/productService.js"

const prodService = new ProductsService();

export const getProducts = async (req, res) =>{
    const {limit} = parseInt(req.query);
    const page = req.query.page;
    const sort = req.query.sort;
    const query = req.query.query;
    const prod = await prodService.getProducts(limit, page, sort, query);
    res.send(prod);
} 

export const getProductByID = async (req, res) => {
    const prodID = req.params.pid
    const prod = await prodService.getProductByID(prodID);
    console.log(prod)
    res.send(prod);
}

export const addProduct = async (req, res) => {
    res.send(await prodService.addProduct(req.body));
}

export const updateProduct = async (req, res) => {
    const prodID = req.params.pid;
    const newObject = req.body;

    res.send(await prodService.updateProduct(prodID, newObject));
}

export const deleteProduct = async (req, res) => {
    res.send(await prodService.deleteProduct(req.params.pid))
}