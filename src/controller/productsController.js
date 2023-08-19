import { ProductsService } from "../services/productService.js"

const prodService = new ProductsService();

export const getProducts = (req, res) =>{
    const {limit} = parseInt(req.query);
    const page = req.query.page;
    const sort = req.query.sort;
    const query = req.query.query;
    const prod = prodService.getProducts(limit, page, sort, query);
    res.send({status:1, products: prod});
} 

export const getProductByID = (req, res) => {
    const prodID = req.params.pid
    const prod = prodService.getProductByID(prodID);
    res.send(prod);
}

export const addProduct = (req, res) => {
    res.send(prodService.addProduct(req.body));
}

export const updateProduct = (req, res) => {
    const prodID = req.params.pid;
    const newObject = req.body;

    res.send(prodService.updateProduct(prodID, newObject));
}

export const deleteProduct = (req, res) => {
    res.send(prodService.deleteProduct(req.params.pid))
}