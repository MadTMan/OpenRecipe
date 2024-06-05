import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send('Recipe APP');
});



mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('connected to database');
        app.listen(PORT, () => {
            console.log('listening on port: ${ PORT }');
        });
    })
    .catch((error) => {
        console.log(error);
    });