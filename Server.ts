import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
// Import controllers and middleware
import { home } from './src/Controller/HomerControll/HomerController';
import { loginPlace } from './src/Controller/PlaceControll/LoginPlace';
import { allOrders, allOrdersStatusWaitngAcepted, insertPedido } from './src/Controller/OrderControll/OrderController';
import { registePlace } from './src/Controller/PlaceControll/RegisterPlaceController';
import { MiddlewareCheckedCategoriaId, MiddlewareCheckedPlaceId } from './src/Middleware/PlaceControllerMiddleware';
import { } from './src/Controller/ProdutoControll/UpdateProdutoController';
import { MiddlewareValidarTokenAcess, ValidarInfoProdutos } from './src/Middleware/middlwareProduto';
import {registerUser, login, getAllUsers, BuscarUsuario, AtualizarNomeUsuario } from './src/Controller/UserControll/UserController';
import { ValidarParametrosNomeUser, ValidarParametrosCpfUser, ValidarEntradoUsuario, ValidarParametrosSenhaUser, ValidarParametrosEmailUser } from './src/Middleware/middlewareUser';
import { registerCategoria } from './src/Controller/CategoriaControll/RegisterCategoria';
import { Places } from './src/Controller/PlaceControll/FindAllPlaces';
import { FindOneCategoria } from './src/Controller/CategoriaControll/FindOneCategoria';
import { FindAllCategorias } from './src/Controller/CategoriaControll/FindAllCategorias';
import { GeneratePlaceTokenAcess } from './src/Controller/PlaceControll/GeneratedTokenPlace';
import {  allProdutos, allProdutosForData } from './src/Controller/ProdutoControll/GetAllProdutoController';
import { CadastrarProduto } from './src/Controller/ProdutoControll/CadastrarProdutoController';
import { deletedplace } from './src/Controller/PlaceControll/deletedplace';
import { AtualizarProdutoEstoque } from './src/Controller/ProdutoControll/AtualizarProdutoEstoqueController';
import { removeCategoria } from './src/Controller/CategoriaControll/RemovedCategoria';
import { Produto } from './src/Controller/ProdutoControll/GetProdutoController';
import { AtivarPlace, ConfigurarHorarioPlace, InativarPlace } from './src/Controller/PlaceControll/ConfigPlace';
import { Place } from './src/Controller/PlaceControll/FindOnePlace';
import { updateOrder } from './src/Controller/OrderControll/OrderControllerUpdataStatus';
import { OrderDatails, OrderDatailsByorderId } from './src/Controller/OrderControll/PedidoController';


// Load environment variables
dotenv.config();

// Create Express app and router
export const app = express();
const router = express.Router();

// Set up middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 200,
}));
app.use(morgan('combined'));

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: true,
});
app.use(limiter);

// Database connection
// Database connection
const mongoDB = process.env.MONGO_DB_URI;
mongoose.connect(mongoDB)
  .then(() => console.log('Connected to the database'))
  .catch((error) => {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  })

// Global middleware for logging time
router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// Define routes
router.get('/home', home);
router.get('/allUsers', getAllUsers);
router.get('/BuscarUsuario:id', BuscarUsuario);
router.put('/AtualizarNomeUsuario:id',AtualizarNomeUsuario);
router.post('/registerUser', ValidarParametrosNomeUser, ValidarParametrosCpfUser,ValidarParametrosSenhaUser,ValidarEntradoUsuario, registerUser);
router.post('/login', ValidarParametrosEmailUser, ValidarParametrosSenhaUser, login);
router.get('/allProdutos', MiddlewareValidarTokenAcess, allProdutos);
router.get('/allProdutosForData', allProdutosForData);
router.get('/searchAllprodutos/:placeId');
router.get('/allProdutos/:placeId', MiddlewareValidarTokenAcess);
router.get('/produto',Produto);
router.post('/CadastrarProduto', MiddlewareValidarTokenAcess, ValidarInfoProdutos, CadastrarProduto);
router.patch('/AtualizarProdutoEstoque', AtualizarProdutoEstoque);

router.get('/categoria', MiddlewareCheckedPlaceId, MiddlewareCheckedCategoriaId, MiddlewareValidarTokenAcess, FindOneCategoria)

router.get('/categoria/:placeId', FindAllCategorias)
router.post('/registerCategoria', MiddlewareValidarTokenAcess, MiddlewareCheckedPlaceId, registerCategoria)
router.get('/FindOneCategoria', FindOneCategoria)
router.delete('/removedCategoria', removeCategoria);
router.get('/Place', MiddlewareCheckedPlaceId, Place);
router.post('/registePlace', registePlace);
router.post('/loginPlace', loginPlace);
router.delete('/deletedplace', deletedplace);
router.get('/Places', Places);
router.post('/AtivarPlace',AtivarPlace);
router.post('/InativarPlace',InativarPlace);
router.post('/ConfigurarHorarioPlace',ConfigurarHorarioPlace)
router.post('/TokenPlaceAuth', MiddlewareCheckedPlaceId, GeneratePlaceTokenAcess);

router.get('/allOrders/:placeId', allOrders);
router.get('/pedido/:placeId', OrderDatails);
router.get('/OrderDatailsByorderId/:placeId/:orderId', OrderDatailsByorderId);

router.get('/allOrdersStatusWaitngAcepted/:placeId', allOrdersStatusWaitngAcepted)

router.post('/updateOrder',updateOrder);
router.post('/insertPedido', MiddlewareCheckedPlaceId, MiddlewareValidarTokenAcess, insertPedido);
//insertManyItems(ADRESS.PATH);
// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).send('Something went wrong!');
});

// Set up app to use the router
app.use('/', router);

// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});



