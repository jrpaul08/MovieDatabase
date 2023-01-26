import {useEffect, useState} from 'react';
import './App.css'
import SearchIcon from './search.svg'
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com?apikey=9d2c2301';

/*
const movie = {
    "Title": "Spiderman and Grandma",
    "Year": "2009",
    "imdbID": "tt1433184",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjE3Mzg0MjAxMl5BMl5BanBnXkFtZTcwNjIyODg5Mg@@._V1_SX300.jpg"
}
*/

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")


    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        console.log(data)
        setMovies(data.Search);

    }

    const submitSearch = (e) => {
        if(e.key === 'Enter'){
            searchMovies(searchTerm)
        }
    }

    useEffect(() =>{
        searchMovies('spiderman')
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>

            <div className='search'>
                <input 
                placeholder="search for movies" 
                value= {searchTerm} 
                onChange = {(e) => setSearchTerm(e.target.value)}
                onKeyDown = {(e) => submitSearch(e)}
                />
                <img 
                    src={SearchIcon}
                    alt = "search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {   movies?.length > 0  ?
                    (
                     <div className="container">
                         {movies.map((movie, key)=>(<MovieCard movie = {movie} key={key}/>))}
                     </div>
                    )
                    :
                    (
                        <div className='empty'>
                            <h2>no movies found</h2>
                        </div>
                    )
            }

        </div>
    );  
}
export default App;
