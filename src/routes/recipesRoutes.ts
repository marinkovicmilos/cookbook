import { FastifyInstance, FastifyPluginOptions } from 'fastify';

import { authorize } from '../middlewares/authMiddleware';
import { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } from '../controllers/recipesController';

export const recipesRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
    fastify.get('/recipes', getRecipes);
    fastify.get('/recipes/:id', getRecipeById);
    fastify.post('/recipes', { preHandler: authorize(['admin']) }, addRecipe);
    fastify.put('/recipes/:id', { preHandler: authorize(['admin']) }, updateRecipe);
    fastify.delete('/recipes/:id', { preHandler: authorize(['admin']) }, deleteRecipe);
};
