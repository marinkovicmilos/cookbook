import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { login } from '../controllers/userController';

export const usersRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
    fastify.post('/login', login);
};
