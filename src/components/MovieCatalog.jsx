import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../contexts/BasketContext';
import movieData from '../movieData';
import './MovieCatalog.css';

const MovieCatalog = () => {
  const navigate = useNavigate();
  const { addToBasket } = useBasket();
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showTime, setShowTime] = useState('');
  const [seatNumbers, setSeatNumbers] = useState('');

  const handleAddToBasket = (movie) => {
    setSelectedMovie(movie);
    
    // Устанавливаем время по умолчанию (завтра в 20:00)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(20, 0, 0, 0);
    setShowTime(tomorrow.toISOString().slice(0, 16));
    
    // Устанавливаем места по умолчанию
    setSeatNumbers('A' + (Math.floor(Math.random() * 10) + 1));
    
    setShowModal(true);
  };

  const handleConfirmAdd = () => {
    if (!selectedMovie) return;
    
    const seatsArray = seatNumbers.split(',').map(s => s.trim());
    
    addToBasket(selectedMovie, quantity, showTime, seatsArray);
    
    setShowModal(false);
    setSelectedMovie(null);
    setQuantity(1);
    
    // Показать уведомление
    alert(`${selectedMovie.title} добавлен в корзину!`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Каталог фильмов</h1>
        <div className="catalog-stats">
          <span>{movieData.length} фильмов доступно</span>
          <button 
            className="view-basket-btn"
            onClick={() => navigate('/basket')}
          >
            Перейти в корзину
          </button>
        </div>
      </div>

      <div className="movies-grid">
        {movieData.map(movie => (
          <div key={movie.id} className="movie-catalog-card">
            <img src={movie.poster} alt={movie.title} className="movie-poster" />
            
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p className="movie-director">{movie.director}</p>
              <p className="movie-year">{movie.year}</p>
              <div className="movie-rating">
                ⭐ {movie.rating}/10
              </div>
              
              <div className="movie-actions">
                <button 
                  className="detail-btn"
                  onClick={() => navigate(`/?movie=${movie.id}`)}
                >
                  Подробнее
                </button>
                <button 
                  className="add-to-basket-btn"
                  onClick={() => handleAddToBasket(movie)}
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && selectedMovie && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Добавить в корзину</h2>
              <button 
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-movie-info">
                <img src={selectedMovie.poster} alt={selectedMovie.title} />
                <div>
                  <h3>{selectedMovie.title}</h3>
                  <p>Режиссер: {selectedMovie.director}</p>
                  <p>Год: {selectedMovie.year}</p>
                </div>
              </div>
              
              <div className="modal-form">
                <div className="form-group">
                  <label>Количество билетов:</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  />
                </div>
                
                <div className="form-group">
                  <label>Дата и время сеанса:</label>
                  <input
                    type="datetime-local"
                    value={showTime}
                    onChange={(e) => setShowTime(e.target.value)}
                  />
                  <small>Сеанс: {formatDate(showTime)}</small>
                </div>
                
                <div className="form-group">
                  <label>Номера мест:</label>
                  <input
                    type="text"
                    value={seatNumbers}
                    onChange={(e) => setSeatNumbers(e.target.value)}
                    placeholder="A1, A2, A3"
                  />
                  <small>Укажите номера мест через запятую</small>
                </div>
              </div>
              
              <div className="modal-summary">
                <p>Итого: <strong>{quantity} × 350 ₽ = {quantity * 350} ₽</strong></p>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Отмена
              </button>
              <button 
                className="confirm-btn"
                onClick={handleConfirmAdd}
              >
                Добавить в корзину
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCatalog;