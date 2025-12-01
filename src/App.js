import React, { useState } from 'react';
import './App.css';
import movieData from './movieData';

function App() {

  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  }

  if (selectedMovie) {
    return (
      <div className="App"> 
        <button onClick={handleBackClick}> back to table </button>
        <div className="movie-detail">
          <img src={selectedMovie.poster} alt={selectedMovie.title} />
          <div className="detail-info">
            <h1>{selectedMovie.title}</h1>
            <p><strong>Режиссер:</strong> {selectedMovie.director}</p>
            <p><strong>Год:</strong> {selectedMovie.year}</p>
            <p><stromg>Рейтинг:</stromg> ⭐ {selectedMovie.rating}/10</p>
            <p><strong>Описание:</strong> {selectedMovie.description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Мой Кинокаталог</h1>
      <div className="movie-list">
        {movieData.map(movie => (
          <div
            key={movie.id}
            className="movie-card"
            onClick={() => handleMovieClick(movie)}
          >
            <img src={movie.poster} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <small>⭐ {movie.rating}</small>  
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;