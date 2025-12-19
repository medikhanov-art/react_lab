import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import movieData from '../movieData'; // Импортируем movieData
import './Header.css';

// Функция для расчета среднего рейтинга
const calculateAverageRating = () => {
  const totalRating = movieData.reduce((sum, movie) => sum + movie.rating, 0);
  const average = totalRating / movieData.length;
  return average.toFixed(1);
};

function Header() {
  const { currentUser, logout } = useAuth();
  
  // Функция для подсчета товаров в корзине
  const getItemCount = () => {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    return basketItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <h1>Мой Кинокаталог</h1>
          </Link>
          <p className="header-subtitle">Лучшие фильмы всех времен</p>
        </div>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог</Link>
          <Link to="/basket" className="nav-link">
            Корзина {getItemCount() > 0 && `(${getItemCount()})`}
          </Link>
          
          {/* Условный рендеринг в зависимости от аутентификации */}
          {currentUser ? (
            <>
              <Link to="/orders" className="nav-link">Мои заказы</Link>
              <Link to="/profile" className="nav-link">Профиль</Link>
              <button 
                onClick={handleLogout}
                className="nav-link logout-btn"
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '1.1rem'
                }}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/orders" className="nav-link">Мои заказы</Link>
              <Link to="/about" className="nav-link">О проекте</Link>
              <Link to="/login" className="nav-link">Войти</Link>
              <Link to="/register" className="nav-link register-btn">
                Регистрация
              </Link>
            </>
          )}
        </nav>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">{movieData.length}</span>
            <span className="stat-label">фильмов</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">⭐ {calculateAverageRating()}</span>
            <span className="stat-label">средний рейтинг</span>
          </div>
          {currentUser && (
            <div className="stat-item">
              <span className="stat-number">👤</span>
              <span className="stat-label">
                {currentUser.firstName?.charAt(0) || 'U'}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;