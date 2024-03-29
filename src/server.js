const Fastify = require('fastify');

const port = 3000;
const fastify = Fastify({
    logger: true
});


fastify.get('/', async (request, response) => {
    return response.code(201).send({ hello: 'world' });
});

const start = async () => {
    try {
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
