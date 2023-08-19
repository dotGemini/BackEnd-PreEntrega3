import { Router } from "express";
import { ProductManager } from "../dao/prodManager/ProductManager.js";
import { CartManager } from "../dao/cartManager/cartMaganer.js";

const router = Router();

const publicAccess = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    next();
}
const privateAccess = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    next();
}

router.get('/', privateAccess, async (req, res) => {
    const productManager = new ProductManager();
    const products = await productManager.getProducts();
    res.render('index', {title: 'ecomerce', products: products, user: req.session.user})
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {title: 'ecomerce'});
})

router.get('/webchat', (req, res) => {
    res.render('chat', {title: 'webchat'});
})

router.get('/productList', privateAccess, async (req, res) => {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const sort = req.query.sort;
    const query = req.query.query;

    const productManager = new ProductManager();
    const products = await productManager.getProducts(limit, page, sort, query);

    let productsJSON = products.docs.map(p=> p.toJSON())

    const prod = {
        prodList: products,
        prodDoc: productsJSON
    }

res.render('productList', {
        allProds: prod.prodDoc,
        paginate: prod.prodList,
})

router.get('/cart/:cid', async (req, res) =>{
        try{
        const cartMan = new CartManager();

        const cartID = (req.params.cid);

        const cart = await cartMan.getCart(cartID);

        res.render('cart', {
            title: "Carrito seleccionado",
            carritoEncontrado: cart,
        })
    } catch (error) {
        res.send(`${error.message}`)
    }
})

})

router.get('/register', publicAccess, (req, res) => {
    res.render('register');
})

router.get('/login', publicAccess, (req, res) => {
    res.render('login');
})

export default router;