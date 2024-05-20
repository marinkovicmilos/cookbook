import Joi, { Schema, ValidationResult } from 'joi';
import { Recipe, IRecipe } from '../models/recipeModel';

const recipeSchema: Schema = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    steps: Joi.array().items(Joi.string()).required()
});

const validateRecipe = (recipeData: any): ValidationResult => {
    return recipeSchema.validate(recipeData);
};

export const getRecipes = async (request: any, reply: any): Promise<IRecipe[]> => {
    try {
        const recipes = await Recipe.find();
        return recipes;
    } catch (error: any) {
        reply.status(500).send({ error: `Error getting recipes: ${error.message}` });
        throw error;
    }
};

export const getRecipeById = async (request: any, reply: any): Promise<IRecipe | undefined> => {
    try {
        const recipeId = request.params.id;
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }
        return recipe;
    } catch (error: any) {
        reply.status(500).send({ error: error.message });
        throw error;
    }
};

export const addRecipe = async (request: any, reply: any): Promise<IRecipe> => {
    try {
        const validationError = validateRecipe(request.body);
        if (validationError.error) {
            return reply.status(400).send({ error: validationError.error.details[0].message });
        }

        const { name, ingredients, steps } = request.body;
        const recipe = new Recipe({ name, ingredients, steps });
        await recipe.save();

        return recipe;
    } catch (error: any) {
        reply.status(500).send({ error: error.message });
        throw error;
    }
};

export const updateRecipe = async (request: any, reply: any): Promise<IRecipe | undefined> => {
    try {
        const validationResult = validateRecipe(request.body);
        if (validationResult.error) {
            return reply.status(400).send({ error: validationResult.error.details[0].message });
        }

        const recipeId = request.params.id;
        const { name, ingredients, steps } = request.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, { name, ingredients, steps }, { new: true });

        if (!updatedRecipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return updatedRecipe;
    } catch (error: any) {
        reply.status(500).send({ error: 'Internal Server Error' });
        throw error;
    }
};

export const deleteRecipe = async (request: any, reply: any): Promise<{ message: string } | undefined> => {
    try {
        const recipeId = request.params.id;

        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return reply.status(404).send({ error: 'Recipe not found' });
        }

        return { message: `Recipe with ID ${recipeId} deleted successfully` };
    } catch (error: any) {
        reply.status(500).send({ error: error.message });
        throw error;
    }
};
