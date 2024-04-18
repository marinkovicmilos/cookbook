import { Recipe } from '../models/recipeModel.mjs';

export const getRecipes = async (request, reply) => {
    try {
        const recipes = await Recipe.find();

        return recipes;
    } catch (error) {
        reply.status(500).send({ error: `Error getting recipes: ${error.message}` });
    }
};

export const getRecipeById = async (request, reply) => {
    try {
        const recipeId = request.params.id;
        const recipe = await Recipe.findById(recipeId);

        if (!recipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return recipe;
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
};

export const addRecipe = async (request, reply) => {
    try {
        const { name, ingredients, steps } = request.body;

        const recipe = new Recipe({ name, ingredients, steps });

        await recipe.save();

        return recipe;
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
};

export const updateRecipe = async (request, reply) => {
    try {
        const recipeId = request.params.id;
        const { name, ingredients, steps } = request.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { name, ingredients, steps }, { new: true });

        if (!updatedRecipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return updatedRecipe;
    } catch (error) {
        reply.status(500).send({ error: 'Internal Server Error' });
    }
};

export const deleteRecipe = async (request, reply) => {
    try {
        const recipeId = request.params.id;

        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return { message: `Recipe with ID ${recipeId} deleted successfully` };
    } catch (error) {
        reply.status(500).send({ error: error.message });
    }
};
