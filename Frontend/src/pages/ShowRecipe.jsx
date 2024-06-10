// import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowRecipe = () => {
    
    const [recipe, setRecipe] = useState({});
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/recipes/${id}`)
            .then((res) =>{
                setRecipe(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [])
  return (
    <div className='p-4'>
        <BackButton/>
        <h1 className='text-3x1 my-4'>Show Recipe</h1>
        {loading? (
            <Spinner/>
        ) : (
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Id</span>
                    <span>{recipe._id}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Recipe</span>
                    <span>{recipe._recipe_name}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Chef</span>
                    <span>{recipe.chef}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Servings</span>
                    <span>{recipe.servings}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Preparation Time</span>
                    <span>{recipe.preparaiotn_time}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Ingredinets</span>
                    <span>{recipe.ingredients}</span>
                </div>
                <div className='my-4'>
                    <span className='text-xl mr-4 text-grey-500'>Last Update</span>
                    <span>{new Date(recipe.updatedAt).toString()}</span>
                </div>
                
            </div>
        )
        }
    </div>
  )
}

export default ShowRecipe