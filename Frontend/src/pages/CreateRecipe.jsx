import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const [recipeName, setRecipeName] = useState('');
    const [chefName, setChefName] = useState('');
    const [servings, setServings] = useState('');
    const [preparationTime, setPreparationTime] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveRecipe = () => {
        const data = {
            recipe_name: recipeName,
            chef: chefName,
            servings,
            preparation_time: preparationTime,
            ingredients,
        };
        setLoading(true);
        axios
            .post('http://localhost:5555/recipes', data)
            .then(() => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setLoading(false);
                alert('Error: ' + error.message);
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Create Recipe</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Recipe Name</label>
                    <input 
                        type='text'
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Chef</label>
                    <input 
                        type='text'
                        value={chefName}
                        onChange={(e) => setChefName(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Servings</label>
                    <input 
                        type='text'
                        value={servings}
                        onChange={(e) => setServings(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Preparation Time</label>
                    <input 
                        type='text'
                        value={preparationTime}
                        onChange={(e) => setPreparationTime(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Ingredients</label>
                    <input 
                        type='text'
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveRecipe}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default CreateRecipe;
