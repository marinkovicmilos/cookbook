import { getRecipes } from '../controllers/recipesController.mjs';

async function routes(fastify, options) {
    fastify.get('/recipes', getRecipes);
}

export default routes;
