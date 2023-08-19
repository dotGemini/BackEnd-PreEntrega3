import ProductManager from "../dao/prodManager/ProductManager.js";

export class ProductsService {
    constructor() {
        this.prodDao = new ProductManager();
    }

    async getProducts(limit, page, sort, query){
        return await this.prodDao.getProducts (limit, page, sort, query);
    }

    async getProductByID(id) {
        return await this.prodDao.getProductByID(id);
    }

    async addProduct(body) {
        return await this.prodDao.addProduct(body);
    }

    async updateProduct(prodID, newObject){
        return await this.prodDao.updateProduct(prodID, newObject);
    }

    async deleteProduct(id) {
        return await  this.prodDao.deleteProduct(id);
    }
}