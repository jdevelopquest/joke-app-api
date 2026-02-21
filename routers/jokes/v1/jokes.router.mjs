import {Router} from 'express';
import {create, show, random, index} from "../../../controllers/jokes/v1/jokes.controller.mjs";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../../../swagger/v1/swagger.json' with {type: 'json'};

const router = new Router();

router.post('/create', create);
router.get('/index', index);
router.get('/show/:id', show);
// Adds headers: Access-Control-Allow-Origin: *
router.get('/random', cors(), random);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
