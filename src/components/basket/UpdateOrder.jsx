import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext';
import './UpdateOrder.css';

const UpdateOrder = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrder } = useBasket();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    status: 'pending',
    notes: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Имитация загрузки данных
    const loadOrderData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const order = orders.find(o => o.id === parseInt(orderId));
        
        if (order) {
          setFormData({
            customerName: order.customerName || 'Медиханов Арман',
            customerEmail: order.customerEmail || 'example@gmail.com',
            customerPhone: order.customerPhone || '+996 555 55 55 55',
            deliveryAddress: order.deliveryAddress || '',
            status: order.status,
            notes: order.notes || ''
          });
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadOrderData();
  }, [orderId, orders]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Введите имя';
    }
    
    if (!formData.customerEmail.trim()) {
      newErrors.customerEmail = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.customerEmail)) {
      newErrors.customerEmail = 'Введите корректный email';
    }
    
    if (!formData.customerPhone.trim()) {
      newErrors.customerPhone = 'Введите телефон';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Имитация API запроса
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateOrder(parseInt(orderId), formData);
      
      alert('Заказ успешно обновлен!');
      navigate(`/order/${orderId}`);
      
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error);
      alert('Произошла ошибка при обновлении заказа. Попробуйте еще раз.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при изменении поля
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Вы уверены, что хотите отменить заказ?')) {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        updateOrder(parseInt(orderId), { status: 'cancelled' });
        alert('Заказ отменен!');
        navigate(`/order/${orderId}`);
      } catch (error) {
        alert('Ошибка при отмене заказа');
      }
    }
  };

  const handleDeleteOrder = async () => {
    if (window.confirm('Вы уверены, что хотите удалить заказ? Это действие нельзя отменить.')) {
      try {
        // Здесь должна быть логика удаления из контекста
        alert('Заказ удален!');
        navigate('/orders');
      } catch (error) {
        alert('Ошибка при удалении заказа');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка данных заказа...</p>
      </div>
    );
  }

  return (
    <div className="update-order-container">
      <div className="update-header">
        <h1>Редактирование заказа</h1>
        <p>Измените данные заказа или обновите его статус</p>
      </div>

      <div className="update-content">
        <form onSubmit={handleSubmit} className="update-form">
          <div className="form-section">
            <h2>Контактная информация</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="customerName">Имя и фамилия *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className={errors.customerName ? 'error' : ''}
                />
                {errors.customerName && (
                  <span className="error-message">{errors.customerName}</span>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="customerEmail">Email *</label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className={errors.customerEmail ? 'error' : ''}
                />
                {errors.customerEmail && (
                  <span className="error-message">{errors.customerEmail}</span>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="customerPhone">Телефон *</label>
              <input
                type="tel"
                id="customerPhone"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleInputChange}
                className={errors.customerPhone ? 'error' : ''}
              />
              {errors.customerPhone && (
                <span className="error-message">{errors.customerPhone}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="deliveryAddress">Адрес доставки</label>
              <textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
                rows="3"
                placeholder="Улица, дом, квартира"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Статус заказа</h2>
            
            <div className="status-selector">
              <div className="status-options">
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="pending"
                    checked={formData.status === 'pending'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <span className="status-indicator pending"></span>
                    <div>
                      <span className="status-title">Ожидает оплаты</span>
                      <span className="status-desc">Заказ создан, ожидает оплаты</span>
                    </div>
                  </div>
                </label>
                
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="processing"
                    checked={formData.status === 'processing'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <span className="status-indicator processing"></span>
                    <div>
                      <span className="status-title">В обработке</span>
                      <span className="status-desc">Заказ оплачен, обрабатывается</span>
                    </div>
                  </div>
                </label>
                
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="completed"
                    checked={formData.status === 'completed'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <span className="status-indicator completed"></span>
                    <div>
                      <span className="status-title">Завершен</span>
                      <span className="status-desc">Заказ доставлен и выполнен</span>
                    </div>
                  </div>
                </label>
                
                <label className="status-option">
                  <input
                    type="radio"
                    name="status"
                    value="cancelled"
                    checked={formData.status === 'cancelled'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <span className="status-indicator cancelled"></span>
                    <div>
                      <span className="status-title">Отменен</span>
                      <span className="status-desc">Заказ отменен</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Дополнительная информация</h2>
            
            <div className="form-group">
              <label htmlFor="notes">Комментарий к заказу</label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                placeholder="Дополнительные комментарии или инструкции..."
              />
            </div>
          </div>

          <div className="form-actions">
            <div className="danger-actions">
              <button
                type="button"
                className="danger-btn cancel-btn"
                onClick={handleCancelOrder}
                disabled={formData.status === 'cancelled'}
              >
                Отменить заказ
              </button>
              
              <button
                type="button"
                className="danger-btn delete-btn"
                onClick={handleDeleteOrder}
              >
                Удалить заказ
              </button>
            </div>
            
            <div className="main-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate(`/order/${orderId}`)}
              >
                Отмена
              </button>
              
              <button
                type="submit"
                className="primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить изменения'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;