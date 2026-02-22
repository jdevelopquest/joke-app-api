import Jokes from '../../../models/Jokes.mjs';

export function create(req, res) {
    if (typeof req.body === 'object' && !Array.isArray(req.body) && Object.hasOwn(req.body, 'premise') && Object.hasOwn(req.body, 'punchline') && typeof req.body.premise === 'string' && typeof req.body.punchline === 'string') {
        const joke = {'premise': req.body.premise.trim(), 'punchline': req.body.punchline.trim()};
        if (joke.premise.length > 0 && joke.punchline.length > 0) {
            Jokes.create(joke)
                .then(joke => res.status(201).json(joke))
                .catch(e => res.status(500).json({'message': 'Error creating joke'}))
            return;
        }
    }
    res.status(400).json({'message': 'Content-Type must be application/json, joke premise and punchline are required and must be strings at least one character long'});
}

export function index(req, res) {
    Jokes.findAll()
        .then(jokes => res.status(200).json(jokes))
        .catch(e => res.status(500).json({'message': 'Error retrieving jokes'}))
}

export function show(req, res) {
    if (Object.hasOwn(req.params, 'id')) {
        const id = Number(req.params.id);
        if (Number.isInteger(id)) {
            Jokes.findByPk(id)
                .then(joke => {
                    if (joke === null) {
                        res.status(404).json({'message': 'Joke not found'})
                    } else {
                        res.status(200).json(joke)
                    }
                })
                .catch(e => res.status(500).json({'message': 'Error retrieving joke'}))
            return;
        }
    }
    res.status(400).json({'message': 'Joke ID is required and must be a number'})
}

export function random(req, res) {
    Jokes.findAll()
        .then(jokes => {
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            res.status(200).json(joke);
        })
        .catch(e => res.status(500).json({'message': 'Error retrieving random joke'}))
}
