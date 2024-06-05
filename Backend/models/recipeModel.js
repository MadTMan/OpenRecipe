import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    
    recipe_name: {
        type: String,
        required: true,
    },
    chef: {
        type: String,
        required: true,
    },
    servings: {
        type: String,
        required: true,
    },
    preparation_time: {
        type:String,
        required: true,
    },
    ingredients: {
        type:String,
        required: true,
    },
  });

  
export const Recipe = mongoose.model('Steak', recipeSchema);