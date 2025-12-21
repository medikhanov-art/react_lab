import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import './Header.css';

function Header() {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const getItemCount = () => {
    const basketItems = JSON.parse(localStorage.getItem('basketItems')) || [];
    return basketItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const itemCount = getItemCount();

  const handleLogout = () => {
    logout();
  };

    return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="logo-link">
            <h1>Мой Кинокаталог</h1>
          </Link>
          <p className="header-subtitle">Лучшие фильмы всех времен</p>
        </div>

        <nav className="header-nav">
          <Link to="/" className="nav-link">Главная</Link>
          <Link to="/catalog" className="nav-link">Каталог</Link>
          <Link to="/about" className="nav-link">О проекте</Link>
          <Link to="/basket" className="nav-link">
            Корзина {itemCount > 0 && <span className="cart-badge">({itemCount})</span>}
          </Link>

          <button 
            onClick={toggleTheme}
            className="nav-link theme-toggle-btn"
            type="button"
            aria-label={`Переключить на ${theme === 'light' ? 'темную' : 'светлую'} тему`}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {currentUser ? (
            <>
              <Link to="/orders" className="nav-link">Мои заказы</Link>
              <Link to="/profile" className="nav-link">Профиль</Link>
              <button 
                onClick={handleLogout}
                className="nav-link logout-btn"
                type="button"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Войти</Link>
              <Link to="/register" className="nav-link register-btn">Регистрация</Link>
            </>
          )}
        </nav>

        <div className="header-stats">
          {currentUser ? (
            <div className="stat-item">
              <span className="stat-number">👤</span>
              <span className="stat-label">
                {currentUser.firstName?.charAt(0) || 'U'}
              </span>
            </div>
          ) : (
            <div className="stat-item placeholder" aria-hidden="true"></div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;