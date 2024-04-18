import { getRecipes, getRecipeById, addRecipe, deleteRecipe } from '../controllers/recipesController.mjs';

export async function routes(fastify, options) {
    fastify.get('/recipes', getRecipes);
    fastify.get('/recipes/:id', getRecipeById);
    fastify.post('/recipes', addRecipe);
    fastify.delete('/recipes/:id', deleteRecipe);
}

export default routes;
