import Jokes from '../../../models/Jokes.mjs';

export function create(req, res) {
    const setup400 = () => res.status(400).json({'message': 'Invalid request JSON body, joke premise and punchline are required and must be strings'});
    if (req.body === undefined || req.body === null || typeof req.body !== 'object' || Array.isArray(req.body)) {
        setup400();
        return;
    }
    if (!('premise' in req.body) || !('punchline' in req.body)) {
        setup400();
        return;
    }
    if (typeof req.body.premise !== 'string' || typeof req.body.punchline !== 'string') {
        setup400();
        return;
    }
    const joke = {'premise': req.body.premise.trim(), 'punchline': req.body.punchline.trim()};
    if (joke.premise.length === 0 || joke.punchline.length === 0) {
        setup400();
        return;
    }
    Jokes.create(joke)
        .then(joke => res.status(201).json(joke))
        .catch(e => res.status(500).json({'message': 'Error creating joke'}))
}

export function index(req, res) {
    Jokes.findAll()
        .then(jokes => res.status(200).json(jokes))
        .catch(e => res.status(500).json({'message': 'Error retrieving jokes'}))
}

export function show(req, res) {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
        res.status(400).json({'message': 'Joke ID is required and must be a number'})
        return;
    }
    Jokes.findByPk(id)
        .then(joke => {
            if (joke === null) {
                res.status(404).json({'message': 'Joke not found'})
            } else {
                res.status(200).json(joke)
            }
        })
        .catch(e => res.status(500).json({'message': 'Error retrieving joke'}))
}

export function random(req, res) {
    Jokes.findAll()
        .then(jokes => {
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            res.status(200).json(joke);
        })
        .catch(e => res.status(500).json({'message': 'Error retrieving random joke'}))
}
