import Jokes from '../../../models/Jokes.mjs';

export function create(req, res) {
    const isValidString = (value) => typeof value === 'string' && value.trim().length > 0;
    const joke = req.body;
    if (Object.keys(joke).length > 2 || !isValidString(joke.premise) || !isValidString(joke.punchline)) {
        res.status(400).json({'message': 'Invalid request body, joke premise and punchline are required and must be strings'});
    } else {
        Jokes.create(joke)
            .then(joke => {
                res.status(201).json({'message': 'Joke created successfully'})
            })
            .catch(e => res.status(500).json({'message': 'Error creating joke'}))
    }
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
    } else {
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
}

export function random(req, res) {
    Jokes.findAll()
        .then(jokes => {
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            res.status(200).json(joke);
        })
        .catch(e => res.status(500).json({'message': 'Error retrieving random joke'}))
}
