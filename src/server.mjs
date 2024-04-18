import Fastify from 'fastify';
import recipesRoutes from './routes/recipesRoutes.mjs';
import mongoose from 'mongoose';

const port = 3000;
const fastify = Fastify({
    logger: true
});

fastify.register(recipesRoutes);

const connectToDatabase = async () => {
    const uri = 'mongodb://localhost:27017/cookbook';
    mongoose.connect(uri)
        .then(() => console.log('Connected to MongoDB'))
        .catch(err => console.error('Error connecting to MongoDB:', err));
};

const start = async () => {
    try {
        connectToDatabase();
        fastify.listen({ port }, (err, address) => {
            if (err) throw err
            console.log(`Server listening on ${address}`);
        });
    } catch (error) {
        console.error(`Error fastify: ${JSON.stringify(error)}`);
        process.exit(1);
    }
};

start();
