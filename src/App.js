import React, { useState } from 'react';
import './App.css';
import movieData from './movieData';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  }

  return (
    <div className="App">
      <Header />
      
      <main className="app-main">
        {selectedMovie ? (
          <div>
            <button onClick={handleBackClick}>← Назад к каталогу</button>
            <div className="movie-detail">
              <img src={selectedMovie.poster} alt={selectedMovie.title} />
              <div className="detail-info">
                <h1>{selectedMovie.title}</h1>
                <p><strong>Режиссер:</strong> {selectedMovie.director}</p>
                <p><strong>Год:</strong> {selectedMovie.year}</p>
                <p><strong>Рейтинг:</strong> ⭐ {selectedMovie.rating}/10</p>
                <p><strong>Описание:</strong> {selectedMovie.description}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <h2>Каталог фильмов</h2>
            <p className="catalog-info">Найдено {movieData.length} фильмов</p>
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
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;