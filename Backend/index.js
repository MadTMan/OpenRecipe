import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import { Recipe } from './models/recipeModel.js'; 
import recipesRoute from './routes/recipesRoute.js';

const app = express();

//Middleware for parsing requests
app.use(express.json());


app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Recipe APP');
});


app.use('/recipes', recipesRoute)

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