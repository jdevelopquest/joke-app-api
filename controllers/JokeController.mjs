import jokes from '../models/Jokes.mjs';

class JokeController {
    create(req, res) {
        jokes.create(req.body)
            .then(r => res.status(201).json({'message': 'Joke created successfully'}))
            .catch(e => res.status(500).json({'message': 'Error creating joke'}))
    }

    index(req, res) {
        jokes.findAll()
            .then(jokes => res.status(200).json(jokes))
            .catch(e => res.status(500).json({'message': 'Error retrieving jokes'}))
    }

    show(req, res) {
        jokes.findByPk(req.params.id)
            .then(joke => {
                if (!joke) return res.status(404).json({'message': 'Joke not found'});
                res.status(200).json(joke);
            })
            .catch(e => res.status(500).json({'message': 'Error retrieving joke'}))
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