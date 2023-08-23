import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import productsRoutes from "./routes/productsRouter.js"
import cartsRoutes from "./routes/cartsRouter.js"
import viewsRoutes from "./routes/viewsRouter.js"
import messagesRouter from  "./routes/messagesRouter.js"
import { Server } from 'socket.io';
import { productsUpdated, chat  } from './utils/socketUtils.js';
import sessionsRouter from './routes/sessionsRouter.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import config from './config/config.js';


const app = express();

const mongoURL = `mongodb+srv://admin:admin@clusterprueba.g12vkb7.mongodb.net/ecommerce`;
const connection = mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'))
app.use(session({
    store: new MongoStore({
        mongoUrl: mongoURL,
        ttl: 3600
    }),
    secret: "CoderS3cr3t",
    resave: false,
    saveUninitialized: false
}));
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/messages', messagesRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRoutes);

const PORT = 8080;
const p = config.port;
const serverHttp = app.listen(PORT, () => {console.log('Servidor iniciado en:', PORT)})

const io = new Server(serverHttp);

app.set('io', io);

io.on('connection', socket => {
    console.log('New client connected', socket.id);
    productsUpdated(io);
    chat(socket, io);
});