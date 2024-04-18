import { getRecipes, getRecipeById } from '../controllers/recipesController.mjs';

export async function routes(fastify, options) {
    fastify.get('/recipes', getRecipes);
    fastify.get('/recipes/:id', getRecipeById);
}

export default routes;
