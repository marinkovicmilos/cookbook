const jwt = require('jsonwebtoken');

exports.authenticate = async (request, reply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            request.user = decoded;
        } else {
            request.user = { role: 'user' }
        }
    } catch (err) {
        reply.code(401).send({ error: 'Invalid token' });
    }
};

exports.authorize = (roles) => {
    return (request, reply, next) => {
        const userRole = request.user.role;

        if (!roles.includes(userRole)) {
            return reply.status(403).send({ error: 'Unauthorized' });
        }

        next();
    };
};
