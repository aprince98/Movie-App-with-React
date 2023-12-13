import {useEffect, useState} from "react";
import MovieCard from "./MovieCard";

import './App.css'
import SearchIcon from './search.svg'

const API_URL = 'http://www.omdbapi.com?apikey=e51c60f2';

const movie1 = {
  "Title": "Lois & Clark: The New Adventures of Superman",
  "Year": "1993–1997",
  "imdbID": "tt0106057",
  "Type": "series",
  "Poster": "https://m.media-amazon.com/images/M/MV5BZTU1ZGFjNzEtZWYzZC00ZmI0LTg2NmMtN2YyNTY4YzhlODIyXkEyXkFqcGdeQXVyMjExMjk0ODk@._V1_SX300.jpg"
}
const App = () => {
  const[movies, setMovies] = useState([]);
  const [searchTerm,setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`)
    const data = await response.json();

    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies('Superman');
  },[])

  return (
    <div className="app">
      <h1>
          MyMovies
      </h1>
      <div className="search">
        <input placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src={SearchIcon} 
        alt="search" 
        onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {
        movies?.length > 0
        ? (
          <div className="container">
            {movies.map((movie)=> (
              <MovieCard movie={movie}/>
            ))}
          </div>
        ) : (
          <div className="empty"> 
              <h2>No Movies Found</h2>
          </div>
        )

    }

      
    </div>
  );
}

export default App
