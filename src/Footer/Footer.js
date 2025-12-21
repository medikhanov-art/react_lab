import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="brand">
          <h3 className="brand-title">Мой Кинокаталог</h3>
          <p className="brand-desc">Подборки фильмов, рейтинги и персональные списки.</p>
        </div>

        <nav className="quick-links" aria-label="Навигация по сайту">
          <h4>Навигация</h4>
          <ul>
            <li><Link to="/" className="footer-link">Главная</Link></li>
            <li><Link to="/catalog" className="footer-link">Каталог</Link></li>
            <li><Link to="/about" className="footer-link">О проекте</Link></li>
            <li><Link to="/profile" className="footer-link">Профиль</Link></li>
          </ul>
        </nav>

        <div className="contacts">
          <h4>Контакты</h4>
          <p className="contact-item">medikhanov_a@iuca.kg</p>
          <p className="contact-item">+996 703 35 22 06</p>
        </div>
      </div>

      <div className="footer-copy">© {currentYear} Мой Кинокаталог. Все права защищены.</div>
    </footer>
  );
}

export default Footer;