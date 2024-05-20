import mongoose from 'mongoose';

export interface IRecipe extends Document {
    name: string;
    ingredients: string[];
    steps: string[];
}

const recipeSchema: mongoose.Schema<IRecipe> = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    steps: [{ type: String, required: true }]
});

export const Recipe: mongoose.Model<IRecipe> = mongoose.model<IRecipe>('Recipe', recipeSchema);
