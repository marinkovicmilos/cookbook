import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipesController.mjs';
import { authorize } from '../middlewares/authMiddleware.mjs'

async function routes(fastify, options) {
    fastify.get('/recipes', getRecipes);
    fastify.get('/recipes/:id', getRecipeById);
    fastify.post('/recipes', { preHandler: authorize(['admin']) }, addRecipe);
    fastify.put('/recipes/:id', { preHandler: authorize(['admin']) }, updateRecipe);
    fastify.delete('/recipes/:id', { preHandler: authorize(['admin']) }, deleteRecipe);
}

export default routes;
