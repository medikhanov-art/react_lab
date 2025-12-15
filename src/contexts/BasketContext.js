import React, { createContext, useState, useContext } from 'react';

const BasketContext = createContext();

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
};

export const BasketProvider = ({ children }) => {
  // Фейковые API данные для корзины
  const initialBasketItems = [
    {
      id: 1,
      movieId: 1,
      title: "Остров проклятых",
      quantity: 2,
      price: 350,
      showTime: "2024-12-20T18:00:00",
      seatNumbers: ["A5", "A6"],
      totalPrice: 700
    },
    {
      id: 2,
      movieId: 2,
      title: "Криминальное чтиво",
      quantity: 1,
      price: 300,
      showTime: "2024-12-20T20:30:00",
      seatNumbers: ["B3"],
      totalPrice: 300
    }
  ];

  const initialOrders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      date: "2024-12-15T14:30:00",
      items: [
        {
          id: 1,
          movieId: 4,
          title: "Побег из Шоушенка",
          quantity: 2,
          price: 350,
          totalPrice: 700
        }
      ],
      totalAmount: 700,
      status: "completed",
      paymentMethod: "card"
    }
  ];

  const [basketItems, setBasketItems] = useState(initialBasketItems);
  const [orders, setOrders] = useState(initialOrders);

  // Добавить в корзину
  const addToBasket = (movie, quantity, showTime, seatNumbers) => {
    const existingItem = basketItems.find(item => item.movieId === movie.id);
    
    if (existingItem) {
      // Обновляем существующий элемент
      const updatedItems = basketItems.map(item =>
        item.id === existingItem.id
          ? {
              ...item,
              quantity: item.quantity + quantity,
              seatNumbers: [...item.seatNumbers, ...seatNumbers],
              totalPrice: (item.quantity + quantity) * item.price
            }
          : item
      );
      setBasketItems(updatedItems);
    } else {
      // Добавляем новый элемент
      const newItem = {
        id: Date.now(),
        movieId: movie.id,
        title: movie.title,
        quantity,
        price: 350, // Базовая цена
        showTime,
        seatNumbers,
        totalPrice: quantity * 350
      };
      setBasketItems([...basketItems, newItem]);
    }
  };

  // Обновить элемент корзины
  const updateBasketItem = (id, updates) => {
    const updatedItems = basketItems.map(item =>
      item.id === id
        ? {
            ...item,
            ...updates,
            totalPrice: updates.quantity ? updates.quantity * item.price : item.totalPrice
          }
        : item
    );
    setBasketItems(updatedItems);
  };

  // Удалить из корзины
  const removeFromBasket = (id) => {
    setBasketItems(basketItems.filter(item => item.id !== id));
  };

  // Очистить корзину
  const clearBasket = () => {
    setBasketItems([]);
  };

  // Создать заказ
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      orderNumber: `ORD-${String(Date.now()).slice(-6)}`,
      date: new Date().toISOString(),
      items: [...basketItems],
      totalAmount: basketItems.reduce((sum, item) => sum + item.totalPrice, 0),
      status: "pending",
      ...orderData
    };
    setOrders([...orders, newOrder]);
    clearBasket();
    return newOrder;
  };

  // Обновить заказ
  const updateOrder = (id, updates) => {
    const updatedOrders = orders.map(order =>
      order.id === id ? { ...order, ...updates } : order
    );
    setOrders(updatedOrders);
  };

  // Удалить заказ
  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  // Получить общую сумму корзины
  const getTotalPrice = () => {
    return basketItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  // Получить количество элементов в корзине
  const getItemCount = () => {
    return basketItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const value = {
    basketItems,
    orders,
    addToBasket,
    updateBasketItem,
    removeFromBasket,
    clearBasket,
    createOrder,
    updateOrder,
    deleteOrder,
    getTotalPrice,
    getItemCount
  };

  return (
    <BasketContext.Provider value={value}>
      {children}
    </BasketContext.Provider>
  );
};