export default (req, res, next) => {
    if (typeof req.body === 'object' && Object.hasOwn(req.body, 'premise') && Object.hasOwn(req.body, 'punchline') && typeof req.body.premise === 'string' && typeof req.body.punchline === 'string') {
        const joke = {'premise': req.body.premise.trim(), 'punchline': req.body.punchline.trim()};
        if (joke.premise.length > 0 && joke.punchline.length > 0) {
            res.locals.joke = joke;
            next();
        } else {
            res.status(400).json({message: 'Joke premise and punchline must be at least one character long'});
        }
    } else {
        res.status(400).json({message: 'Joke premise and punchline are required and must be strings'});
    }
};
