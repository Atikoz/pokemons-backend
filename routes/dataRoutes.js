import express from 'express';
import verifyToken from '../middleware/sessionMiddleware.js';
import DataController from '../controllers/dataController.js';
const dataRouter = express.Router();

dataRouter.get('/getPokemons', verifyToken, DataController.getAllPokemons);
dataRouter.get('/getType', verifyToken, DataController.getAllPokemons);



export default dataRouter