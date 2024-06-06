import express from 'express';
import { Recipe } from '../models/recipeModel.js'; 

const router = express.Router();



//  Route to get recipe from database
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({});

        return res.status(200).json({
            count: recipes.length,
            data: recipes
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//  Route to get one recipe from database by id
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;

        const recipe = await Recipe.findById(id);

        return res.status(200).json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to Update a Book
router.put('/:id', async (req, res) => {
    try {
        if (
            !req.body.recipe_name ||
            !req.body.chef ||
            !req.body.servings ||
            !req.body.preparation_time ||
            !req.body.ingredients
        ) {
            res.status(404).send({
                message: 'send all required fields',
            });
        }

        const { id } = req.params;
        const result = await Recipe.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).send({ message: 'Recipe successfully updated' });


    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});


//route to save a New Recipe
router.post('/', async (req, res) => {
    try {
        if (
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
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//Route to delete a Book
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Recipe.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        return res.status(200).send({ message: 'recipe deleted' });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

export default router;