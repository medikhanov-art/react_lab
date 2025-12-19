import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import movieData from './movieData';
import Header from './Header/Header.js';
import Footer from './Footer/Footer.js';
import { BasketProvider } from './contexts/BasketContext';
import { AuthProvider } from './contexts/AuthContext'; // Импортируем AuthProvider
import BasketList from './components/basket/BasketList.jsx';
import BasketDetail from './components/basket/BasketDetail.jsx';
import CreateOrder from './components/basket/CreateOrder.jsx';
import UpdateOrder from './components/basket/UpdateOrder.jsx';
import MovieCatalog from './components/MovieCatalog.jsx';
import Register from './components/auth/Register.jsx'; // Импортируем компоненты аутентификации
import Login from './components/auth/Login.jsx';
import Profile from './components/auth/Profile.jsx';

// Защищенный маршрут
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
        <Router>
          <div className="App">
            <Header />
            
            <main className="app-main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<MovieCatalog />} />
                <Route path="/basket" element={<BasketList />} />
                <Route path="/create-order" element={<CreateOrder />} />
                <Route path="/order/:orderId" element={<BasketDetail />} />
                <Route path="/update-order/:orderId" element={<UpdateOrder />} />
                <Route path="/orders" element={<OrdersList />} />
                
                {/* Маршруты аутентификации */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </Router>
      </BasketProvider>
    </AuthProvider>
  );
}

// Остальной код остается без изменений...
// function HomePage(), function OrdersList() и т.д.

function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
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
    </div>
  );
}

function OrdersList() {
  // Здесь будет компонент списка заказов
  return <div>Список заказов</div>;
}

export default App;