export default (req, res, next) => {
    if (req.headers['content-type'] === 'application/json') {
        next();
    } else {
        res.status(415).json({message: 'Content-Type must be application/json'});
    }
};
