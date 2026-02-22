import {Router} from 'express';
import cors from 'cors';
import validateContentTypeIsJson from "../../../middlewares/v1/validateContentTypeIsJson.mjs";
import validateAndBuildJoke from "../../../middlewares/v1/validateAndBuildJoke.mjs";
import validateAndBuildJokeId from "../../../middlewares/v1/validateAndBuildJokeId.mjs";
import {create, show, random, index} from "../../../controllers/jokes/v1/jokesController.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../../../swagger/v1/swagger.json' with {type: 'json'};

const router = new Router();

router.post('/create', validateContentTypeIsJson, validateAndBuildJoke, create);
router.get('/index', index);
router.get('/show/:id', validateAndBuildJokeId,show);
// Adds headers: Access-Control-Allow-Origin: *
router.get('/random', cors(), random);
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default router;
