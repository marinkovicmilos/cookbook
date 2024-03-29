import { Recipe } from '../models/recipeModel.mjs';

export const getRecipes = async (request, reply) => {
    try {
        const recipes = await Recipe.find();
        reply.send(recipes);
    } catch (error) {
        reply.status(500).send({ error: `Error getting recipes: ${error.message}` });
    }
};
