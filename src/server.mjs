import Fastify from 'fastify';
import mongoose from 'mongoose';
import 'dotenv/config';

import { createDefaultUser } from './controllers/userController.mjs';

import recipesRoutes from './routes/recipesRoutes.mjs';
import userRoutes from './routes/userRoutes.mjs';
import { authenticate } from './middlewares/authMiddleware.mjs';

const fastify = Fastify({
    logger: true
});

fastify.register(recipesRoutes);
fastify.register(userRoutes);

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
