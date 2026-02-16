import express from 'express';
import jokeRouter from './routers/v1/JokeRouter.mjs';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use('/api/v1/jokes', jokeRouter);

app.listen(port, () => {
    console.log(`Joke app listening on port ${port}`)
})