import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useBasket } from '../../contexts/BasketContext';
import './Orders.css';

const Orders = () => {
  const { currentUser } = useAuth();
  const { orders: contextOrders } = useBasket() || {};
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setOrders([]);
      return;
    }

    // 1) Если есть orders в контексте — используем и фильтруем по пользователю
    if (Array.isArray(contextOrders) && contextOrders.length > 0) {
      setOrders(contextOrders.filter(o => (o.userEmail || '').toLowerCase() === (currentUser.email || '').toLowerCase()));
      return;
    }

    // 2) Попытка получить персональную историю по ключу orders_<email>
    const userKey = `orders_${(currentUser.email || 'guest').toLowerCase()}`;
    const fromUser = JSON.parse(localStorage.getItem(userKey) || '[]');
    if (Array.isArray(fromUser) && fromUser.length > 0) {
      setOrders(fromUser);
      return;
    }

    // 3) Фоллбек — общий список 'orders', фильтруем по email
    const all = JSON.parse(localStorage.getItem('orders') || '[]');
    const filtered = (all || []).filter(o => (o.userEmail || '').toLowerCase() === (currentUser.email || '').toLowerCase());
    setOrders(filtered);
  }, [currentUser, contextOrders]);

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return iso;
    }
  };

  if (!currentUser) {
    return (
      <div className="orders-empty">
        <h2>Пожалуйста, войдите в систему</h2>
        <p>История заказов доступна только авторизованным пользователям.</p>
        <Link to="/login" className="orders-login-btn">Войти</Link>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>Мои заказы</h1>
        <p>История ваших заказов</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Заказы не найдены.</p>
          <Link to="/catalog" className="browse-btn">Перейти в каталог</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.slice().reverse().map(order => (
            <div key={order.id} className="order-row">
              <div className="order-info">
                <Link to={`/order/${order.id}`} className="order-number">Заказ #{order.orderNumber || order.id}</Link>
                <div className="order-meta">
                  <span className="order-date">{formatDate(order.date)}</span>
                  <span className={`order-status status-${order.status || 'unknown'}`}>{order.status || '—'}</span>
                </div>
              </div>
              <div className="order-total">
                <span>{order.totalAmount ?? order.total ?? 0} ₽</span>
                <Link to={`/order/${order.id}`} className="view-btn">Посмотреть</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
