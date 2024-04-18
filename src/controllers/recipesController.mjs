import { Recipe } from '../models/recipeModel.mjs';

export const getRecipes = async (request, reply) => {
    try {
        const recipes = await Recipe.find();
        reply.send(recipes);
    } catch (error) {
        reply.status(500).send({ error: `Error getting recipes: ${error.message}` });
    }
};

export const getRecipeById = async (request, reply) => {
    try {
        const recipeId = +request.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return reply.send(recipe);
    } catch (error) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};
