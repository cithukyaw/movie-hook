import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from "./Header";
import Search from "./Search";
import Movie from "./Movie";

const MOVIE_API_URL = 'http://www.omdbapi.com/?apikey=14e6d320&s=';

const App = () => {
  const [loading, setLoading]           = useState(true);
  const [movies, setMovies]             = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(MOVIE_API_URL + '&s=man')
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      })
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(MOVIE_API_URL + '&s=' + searchValue)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="MOVIE HOOK" />
      <Search search={search}/>
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>Loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
