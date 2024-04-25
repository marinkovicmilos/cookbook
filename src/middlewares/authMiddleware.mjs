import jwt from 'jsonwebtoken';

export const authenticate = async (request, reply) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, 'stavi tajni kljuc u env');
            request.user = decoded;
        } else {
            request.user = { role: 'user' }
        }
    } catch (err) {
        reply.code(401).send({ error: 'Invalid token' });
    }
};

export const authorize = (roles) => {
    return (request, reply, next) => {
        const userRole = request.user.role;

        if (!roles.includes(userRole)) {
            return reply.status(403).send({ error: 'Unauthorized' });
        }

        next();
    };
};
