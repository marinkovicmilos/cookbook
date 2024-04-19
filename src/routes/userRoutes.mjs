import { login } from '../controllers/userController.mjs';

const routes = async (fastify, options) => {
    fastify.post('/login', login);
};

export default routes;
