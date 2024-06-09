import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/CreateRecipe';
import DeleteRecipe from './pages/DeleteRecipe';
import ShowRecipe from './pages/ShowRecipe';
import EditRecipe from './pages/EditRecipe';

 const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes/create' element={<CreateRecipe />} />
        <Route path='/recipes/delete/:id' element={<DeleteRecipe />} />
        <Route path='/recipes/details/:id' element={<ShowRecipe />} />
        <Route path='/recipes/edit/:id' element={<EditRecipe />} />
      </Routes>
  );
};
export default App;