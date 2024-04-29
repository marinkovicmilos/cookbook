const { login } = require('../controllers/userController.js');

exports.routes = async (fastify, options) => {
    fastify.post('/login', login);
};
