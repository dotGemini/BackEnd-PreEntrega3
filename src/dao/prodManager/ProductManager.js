import ProductsModel from "../models/productsModel.js";

export default class ProductManager{

    constructor(){
        this.productsModel = ProductsModel;
    }

    addProduct = async (newField) => {
        try {
            const newProduct = await this.productsModel.create(newField);
            return newProduct;
        } catch (error){
            throw new Error(`${error.message}`)
        }
    }

    updateProduct = async(productID, updateFields) => {
        try {
            const {code, price, stock, url, ...otherFields} = updateFields;

            if(code) {
                const existProduct = await this.productsModel.findOne({code:code});
                if (existProduct && existProduct._id.toString() !== productID) {
                    throw new Error('Codigo ya utilizado')
                }
            }

            const updateProduct = await this.productsModel.findByIdAndUpdate(
                productID,
                {
                    $set: {
                        ...otherFields,
                        ...(code && {code}),
                        ...(price && {price}),
                        stock: stock !== undefined ? stock:0,
                        ...(url && {url}),
                    },
                },
                {new: true, runValidators: true}
            );

            if(!updateProduct){
                throw new Error('No encontrado')
            }
            return updateProduct;
        } catch (error) {
            throw new Error(`${error.message}`)
        }
    }

    deleteProduct = async(productID) => {
        try {
            const product = await this.productsModel.findByIdAndDelete(productID);
            if(!product){
                throw new Error('No encontrado');
            }
        } catch (error) {
            throw new Error (`${error.message}`);
        }
    }

    getProducts = async (limit, page, sort, query) => {
        try {
            const products = await this.productsModel.paginate(
                {query}, {
                    limit: limit || 5,
                    page : page || 1,
                    sort: sort === "asc" ? {price : 1} : sort === "desc" ? {price: -1} : undefined,
            });
            return products;
        } catch (error) {
            throw new Error(`Error: ${error.message}`);
        }
    }

    getProductByID = async (productID) => {
        try{
            const product = await this.productsModel.findById(productID);
            if(!product){
                throw new Error(`Producto no encontrado`);
            }
            return product;
        } catch (error) {
            throw new Error ( `${error.message}`);
        }
    }
}

export { ProductManager }
