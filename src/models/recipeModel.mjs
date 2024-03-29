export const Recipe = {
    async find() {
        return [
            { id: 1, name: 'Pasta Carbonara', ingredients: ['pasta', 'eggs', 'bacon', 'cheese'], steps: ['Cook pasta', 'Fry bacon', 'Mix eggs and cheese', 'Combine everything'] },
            { id: 2, name: 'Chicken Curry', ingredients: ['chicken', 'curry sauce', 'rice'], steps: ['Cook chicken', 'Prepare curry sauce', 'Serve with rice'] }
        ];
    }
};
