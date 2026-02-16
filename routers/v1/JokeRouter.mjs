import { Router } from 'express';
import cors from 'cors';
import JokeController from "../../controllers/JokeController.mjs";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from './swagger.json' with { type: 'json' };

const jokeRouter = new Router();
const jokeController = new JokeController();

jokeRouter.post('/create', (req, res) => {
    jokeController.create(req, res);
})

jokeRouter.get('/index', (req, res) => {
    jokeController.index(req, res);
})

jokeRouter.get('/show/:id', (req, res) => {
    jokeController.show(req, res);
})

// Adds headers: Access-Control-Allow-Origin: *
jokeRouter.get('/random', cors(), (req, res) => {
    jokeController.random(req, res);
})

jokeRouter.use('/api-docs', swaggerUi.serve);
jokeRouter.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default jokeRouter;