const Fastify = require('fastify');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const { createDefaultUser } = require('./controllers/userController.js');

const recipesRoutes = require('./routes/recipesRoutes.js');
const usersRoutes = require('./routes/userRoutes.js');
const { authenticate } = require('./middlewares/authMiddleware.js');

dotenv.config()
const fastify = Fastify({
    logger: true
});

fastify.register(recipesRoutes.routes);
fastify.register(usersRoutes.routes);

fastify.addHook('onRequest', authenticate);

const connectToDatabase = async () => {
    const uri = 'mongodb://localhost:27017/cookbook';
    mongoose.connect(uri)
        .then(() => {
            console.log('Connected to MongoDB');
            createDefaultUser();
        })
        .catch(err => console.error('Error connecting to MongoDB:', err));
};

const start = async () => {
    try {
        connectToDatabase();
        fastify.listen({ port: process.env.PORT }, (err, address) => {
            if (err) throw err
            console.log(`Server listening on ${address}`);
        });
    } catch (error) {
        console.error(`Error fastify: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

start();
