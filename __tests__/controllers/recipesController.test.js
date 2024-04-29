const { getRecipes } = require('../../src/controllers/recipesController.js');
const { Recipe } = require('../../src/models/recipeModel.js');

jest.mock('../../src/models/recipeModel.js', () => ({
    Recipe: {
        find: jest.fn()
    }
}));

describe('recipesController.getRecipes', () => {
    it('should return recipes', async () => {
        // arrange
        const mockRecipes = [{ name: 'Recipe 1' }, { name: 'Recipe 2' }];
        Recipe.find.mockResolvedValue(mockRecipes);
        const request = {};
        const reply = {};

        // act
        const result = await getRecipes(request, reply);

        // assert
        expect(result).toEqual(mockRecipes);
    });

    it('should handle errors', async () => {
        const mockError = new Error('Test error');
        Recipe.find.mockRejectedValue(mockError);

        const request = {};
        const reply = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await getRecipes(request, reply);

        expect(reply.status).toHaveBeenCalledWith(500);
        expect(reply.send).toHaveBeenCalledWith({ error: `Error getting recipes: ${mockError.message}` });
    });
});

