const { getRecipes, getRecipeById, addRecipe, updateRecipe, deleteRecipe } = require('../controllers/recipesController.js');
const { authorize } = require('../middlewares/authMiddleware.js');

exports.routes = async (fastify, options) => {
    fastify.get('/recipes', getRecipes);
    fastify.get('/recipes/:id', getRecipeById);
    fastify.post('/recipes', { preHandler: authorize(['admin']) }, addRecipe);
    fastify.put('/recipes/:id', { preHandler: authorize(['admin']) }, updateRecipe);
    fastify.delete('/recipes/:id', { preHandler: authorize(['admin']) }, deleteRecipe);
}
