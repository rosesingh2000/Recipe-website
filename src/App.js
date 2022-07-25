import logo from './logo.svg';
import React,{useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';
// d8f2d53a ----ID
// 0b70f64f67584eb6a3cdb0d32e571b67	—

const App = () => {
  const APP_ID ="d8f2d53a";
  const APP_KEY ="0b70f64f67584eb6a3cdb0d32e571b67";

  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  },[query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      setRecipes(data.hits);
      console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    //console.log(search);
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input className ="search-bar" type="text" value={search} onChange={updateSearch}></input>
        <button className="search-button" type="submit">SEARCH</button>
      </form>
      <div className='recipes'>
       {recipes.map(recipe =>(
        <Recipe
          key={recipe.recipe.label} 
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image ={recipe.recipe.image}
          ingredients ={recipe.recipe.ingredients}
         />
       ))}

      </div>
      
    </div>
  );
}

export default App;
