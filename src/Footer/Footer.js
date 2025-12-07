import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🎬 Мой Кинокаталог</h3>
          <p className="footer-description">
            Коллекция лучших фильмов всех времен. 
            От классики до современного кино.
          </p>
        </div>
        
        <div className="footer-section">
          <h4>Разделы</h4>
          <ul className="footer-links">
            <li><a href="#home">Главная</a></li>
            <li><a href="#catalog">Каталог фильмов</a></li>
            <li><a href="#new">Новинки</a></li>
            <li><a href="#top">Топ-100</a></li>
            <li><a href="#genres">По жанрам</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Информация</h4>
          <ul className="footer-links">
            <li><a href="#about">О проекте</a></li>
            <li><a href="#contact">Контакты</a></li>
            <li><a href="#privacy">Политика конфиденциальности</a></li>
            <li><a href="#terms">Условия использования</a></li>
            <li><a href="#faq">Частые вопросы</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Контакты</h4>
          <div className="footer-contact">
            <p>medikhanov_a@iuca.kg</p>
            <p>+996 703 35 22 06</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© {currentYear} Мой Кинокаталог. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;