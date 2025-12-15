import React, { useState } from 'react';
import { useBasket } from '../../contexts/BasketContext';
import { Link } from 'react-router-dom';
import './BasketList.css';

const BasketList = () => {
  const { basketItems, removeFromBasket, updateBasketItem, getTotalPrice, getItemCount, clearBasket } = useBasket();
  const [editingItem, setEditingItem] = useState(null);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromBasket(id);
      return;
    }
    updateBasketItem(id, { quantity: newQuantity });
  };

  const handleSeatChange = (id, seats) => {
    updateBasketItem(id, { seatNumbers: seats.split(',').map(s => s.trim()) });
  };

  const handleShowTimeChange = (id, showTime) => {
    updateBasketItem(id, { showTime });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (basketItems.length === 0) {
    return (
      <div className="basket-empty">
        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте фильмы в корзину, чтобы продолжить покупку</p>
          <Link to="/catalog" className="back-to-catalog">
            Вернуться к каталогу
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="basket-container">
      <div className="basket-header">
        <h1>Корзина покупок</h1>
        <div className="basket-summary">
          <span>{getItemCount()} товар(ов) на сумму</span>
          <span className="total-price">{getTotalPrice()} ₽</span>
        </div>
      </div>

      <div className="basket-items">
        {basketItems.map(item => (
          <div key={item.id} className="basket-item">
            <div className="item-info">
              <h3>{item.title}</h3>
              
              {editingItem === item.id ? (
                <div className="item-edit-form">
                  <div className="form-group">
                    <label>Количество билетов:</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Дата и время сеанса:</label>
                    <input
                      type="datetime-local"
                      value={item.showTime.slice(0, 16)}
                      onChange={(e) => handleShowTimeChange(item.id, e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Места (через запятую):</label>
                    <input
                      type="text"
                      value={item.seatNumbers.join(', ')}
                      onChange={(e) => handleSeatChange(item.id, e.target.value)}
                    />
                  </div>
                  
                  <button 
                    className="save-btn"
                    onClick={() => setEditingItem(null)}
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <div className="item-details">
                  <p><strong>Количество:</strong> {item.quantity}</p>
                  <p><strong>Дата сеанса:</strong> {formatDate(item.showTime)}</p>
                  <p><strong>Места:</strong> {item.seatNumbers.join(', ')}</p>
                  <p><strong>Цена за билет:</strong> {item.price} ₽</p>
                  <p className="item-total"><strong>Итого:</strong> {item.totalPrice} ₽</p>
                </div>
              )}
            </div>
            
            <div className="item-actions">
              {editingItem !== item.id && (
                <button 
                  className="edit-btn"
                  onClick={() => setEditingItem(item.id)}
                >
                  ✏️ Редактировать
                </button>
              )}
              <button 
                className="remove-btn"
                onClick={() => removeFromBasket(item.id)}
              >
                🗑️ Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="basket-footer">
        <div className="footer-actions">
          <button 
            className="clear-btn"
            onClick={clearBasket}
          >
            Очистить корзину
          </button>
          <Link to="/catalog" className="continue-shopping">
            Продолжить покупки
          </Link>
        </div>
        
        <div className="checkout-section">
          <div className="order-summary">
            <h3>Итого к оплате</h3>
            <div className="summary-row">
              <span>Товары ({getItemCount()}):</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
            <div className="summary-row">
              <span>Доставка:</span>
              <span>0 ₽</span>
            </div>
            <div className="summary-row total">
              <span>Общая сумма:</span>
              <span>{getTotalPrice()} ₽</span>
            </div>
          </div>
          
          <Link to="/create-order" className="checkout-btn">
            Оформить заказ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasketList;