import Jokes from '../../../models/Jokes.mjs';

export async function create(req, res) {
    try {
        const joke = await Jokes.create(res.locals.joke);
        res.status(201).json(joke);
    } catch (e) {
        res.status(500).json({message: 'Error creating joke'});
    }
}

export async function index(req, res) {
    try {
        const jokes = await Jokes.findAll();
        res.status(200).json(jokes);
    } catch (e) {
        res.status(500).json({message: 'Error retrieving jokes'});
    }
}

export async function show(req, res) {
    try {
        const joke = await Jokes.findByPk(res.locals.jokeId);
        if (joke === null) {
            res.status(404).json({message: 'Joke not found'})
        } else {
            res.status(200).json(joke)
        }
    } catch (e) {
        res.status(500).json({message: 'Error retrieving joke'});
    }
}

export async function random(req, res) {
    try {
        const jokes = await Jokes.findAll();
        const joke = jokes[Math.floor(Math.random() * jokes.length)];
        res.status(200).json(joke);
    } catch (e) {
        res.status(500).json({message: 'Error retrieving random joke'});
    }
}
