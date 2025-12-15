import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const getItemCount = () => 0;

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
          <Link to="/orders" className="nav-link">Мои заказы</Link>
          <Link to="/about" className="nav-link">О проекте</Link>
        </nav>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-number">6</span>
            <span className="stat-label">фильмов</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">⭐ 8.3</span>
            <span className="stat-label">средний рейтинг</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;