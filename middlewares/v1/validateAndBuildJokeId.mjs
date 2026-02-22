export default (req, res, next) => {
    if (Object.hasOwn(req.params, 'id')) {
        const id = Number(req.params.id);
        if (Number.isInteger(id)) {
            res.locals.jokeId = id;
            next();
        } else {
            res.status(400).json({message: 'Joke ID must be a integer number'});
        }
    } else {
        res.status(400).json({message: 'Joke ID is required'});
    }
}
