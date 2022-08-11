const authCheck = (req, res, next) => {
	var header = req.headers.authorization || ''; // get the auth header
	var token = header.split(/\s+/).pop() || '';

    if(token) {
        next()
    }

    res.status(401).json({
        message : 'ccd'
    })
};

export { authCheck };
