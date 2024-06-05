import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Recipe } from './models/recipeModel.js'; 

const app = express();

//Middleware for parsing requests
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Recipe APP');
});

//route to save a New Recipe
app.post('/recipes', async (req, res) => {
    try {
        if(
            !req.body.recipe_name ||
            !req.body.chef ||
            !req.body.servings ||
            !req.body.preparation_time ||
            !req.body.ingredients 
        ) {
            return res.status(404).send({
                message: 'Send all required fields: recipe_name, chef, servings, preparation_time, ingredients',
            });
        }
        const newRecipe = {
            recipe_name: req.body.recipe_name,
            chef: req.body.chef,
            servings: req.body.servings,
            preparation_time: req.body.preparation_time,
            ingredients: req.body.ingredients,                
        };

        const recipe = await Recipe.create(newRecipe);

        return res.status(201).send(recipe);
    } catch(error){
        console.log(error.message);
        res.status(500).send( {message: error.message});
    }
});


mongoose
    .connect(mongoDBURL)
    .then(() => {                                   //call back funciton to route only if database connected
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log('listening on port: ${ PORT }');
        });
    })
    .catch((error) => {
        console.log(error);
    });