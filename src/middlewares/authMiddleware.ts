import jwt from 'jsonwebtoken';

interface UserPayload {
    role: string;
    [key: string]: any;
}

export const authenticate = async (request: any, reply: any) => {
    try {
        if (request.headers.authorization) {
            const token = request.headers.authorization.replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as UserPayload;
            return request.user = decoded;
        } else {
            return request.user = { role: 'user' };
        }
    } catch (err) {
        return reply.code(401).send({ error: 'Invalid token' });
    }
};

export const authorize = (roles: string[]) => {
    return (request: any, reply: any, next: (err?: Error) => void): void => {
        const userRole = request.user?.role;

        if (!userRole || !roles.includes(userRole)) {
            return reply.status(403).send({ error: 'Unauthorized' });
        } else {
            next();
        }
    };
};
