import fs from "fs";

class CartManager{

    constructor(path){
        this.id = 0;
        this.cart = [];
        this.path = path;
    }

    loadCart = async () => {
        if(fs.existsSync(this.path)){
            const db = await fs.promises.readFile(this.path, 'utf8');
            this.cart = JSON.parse(db);
        } else {
            this.cart = [];
        }
        this.id = this.cart[this.cart.length-1] ? (this.cart[this.cart.length-1].id+1) : 1;
    }

    updateCart = async () => {
        fs.promises.writeFile(this.path, JSON.stringify(this.cart));
        return;
    }

    addCart = async() => {
        await this.loadCart();

        const newCart = {
            id: this.id++,
            products: []
        }

        this.cart.push(newCart);
        await this.updateCart();
    }

    getCartByID = async(id) => {
        await this.loadCart()
        const cartID = this.cart.find(cart => cart.id === id);
        if(!cartID){
            return "Not Found"
        }else {
            return cartID.products;
        }
    }

    addProductCart = async(cartID, prodID) =>{
        await this.loadCart();
        let foundProd = false;
        let quantity = 1
        
        const cartProducts = await this.getCartByID(cartID);
        cartProducts.map(prod => {
            if(prod.product === prodID){
                foundProd = true;
                return {
                    ...prod,
                    quantity: ++prod.quantity
                }
            }
        })

        if(!foundProd){
            const prod = {
                product: prodID,
                quantity: quantity
            }
            cartProducts.push(prod);
        }

        await this.updateCart();
    }

}

export {CartManager};