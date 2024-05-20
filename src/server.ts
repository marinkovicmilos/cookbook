import Fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { recipesRoutes } from './routes/recipesRoutes';
import { usersRoutes } from './routes/usersRoutes';
import { authenticate } from './middlewares/authMiddleware';
import { createDefaultUser } from './controllers/userController';

dotenv.config();
const fastify = Fastify({
    logger: true
});

fastify.register(recipesRoutes);
fastify.register(usersRoutes);

fastify.addHook('onRequest', authenticate);

const connectToDatabase = async (): Promise<any> => {
    // move this to env
    const uri = process.env.DB_CONNECTION_STRING;

    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Timeout connecting to database'));
        }, 10000);

        mongoose.connect(process.env.DB_CONNECTION_STRING as string)
            .then(() => {
                clearTimeout(timeout);
                console.log('Connected to MongoDB');
                createDefaultUser();
                resolve('Successful');
            })
            .catch(error => {
                clearTimeout(timeout);
                console.error('Error connecting to MongoDB:', error);
                reject(error);
            });
    });
};

const start = async (): Promise<void> => {
    try {
        await connectToDatabase();
        fastify.listen({ port: Number(process.env.PORT) }, (err, address) => {
            if (err) {
                throw err;
            }
            console.log(`Server listening on ${address}`);
        });
    } catch (error) {
        console.error(`Error starting fastify: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

start();
