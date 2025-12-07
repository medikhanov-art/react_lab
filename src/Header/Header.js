import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-logo">
          <h1>Мой Кинокаталог</h1>
          <p className="header-subtitle">Лучшие фильмы всех времен</p>
        </div>
        <nav className="header-nav">
          <a href="#home" className="nav-link">Главная</a>
          <a href="#catalog" className="nav-link">Каталог</a>
          <a href="#about" className="nav-link">О проекте</a>
          <a href="#contact" className="nav-link">Контакты</a>
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