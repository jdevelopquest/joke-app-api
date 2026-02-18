import jokes from '../models/Jokes.mjs';

class JokeController {
    create(req, res) {
        if (req.body.joke === undefined) {
            res.status(400).json({'message': 'Joke is required'});
        } else if (Object.keys(req.body).length > 1) {
            res.status(400).json({'message': 'Only joke object is allowed'});
        } else if (req.body.joke.question === undefined || typeof req.body.joke.question !== 'string') {
            res.status(400).json({'message': 'Joke question is required and must be a string'});
        } else if (req.body.joke.response === undefined || typeof req.body.joke.response !== 'string') {
            res.status(400).json({'message': 'Joke response is required and must be a string'});
        } else if (Object.keys(req.body.joke).length > 2) {
            res.status(400).json({'message': 'Only question and response are allowed in joke object'});
        } else {
            jokes.create(req.body)
                .then(joke => {
                    res.status(201).json({'message': 'Joke created successfully'})
                })
                .catch(e => res.status(500).json({'message': 'Error creating joke'}))
        }
    }

    index(req, res) {
        jokes.findAll()
            .then(jokes => res.status(200).json(jokes))
            .catch(e => res.status(500).json({'message': 'Error retrieving jokes'}))
    }

    show(req, res) {
        if (req.params.id === undefined || isNaN(req.params.id)) {
            res.status(400).json({'message': 'Joke ID is required and must be a number'})
        } else {
            jokes.findByPk(req.params.id)
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

    random(req, res) {
        jokes.findAll()
            .then(jokes => {
                const joke = jokes[Math.floor(Math.random() * jokes.length)];
                res.status(200).json(joke);
            })
            .catch(e => res.status(500).json({'message': 'Error retrieving random joke'}))
    }
}

export default JokeController;