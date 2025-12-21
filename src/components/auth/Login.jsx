import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
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
      const result = await login(
        formData.email.trim().toLowerCase(),
        formData.password
      );
      
      if (result.success) {
        alert('Вход выполнен успешно!');
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.error || 'Неверный email или пароль' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Ошибка при входе' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  const handleDemoLogin = async () => {
    setFormData({
      email: 'demo@example.com',
      password: 'Demo123',
      rememberMe: false
    });
    
    setIsSubmitting(true);
    
    try {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const demoUser = users.find(u => u.email === 'demo@example.com');
      
      if (!demoUser) {
        const newDemoUser = {
          id: Date.now(),
          firstName: 'Демо',
          lastName: 'Пользователь',
          email: 'demo@example.com',
          password: 'Demo123',
          phone: '+996 555 55 55 55',
          birthDate: '1990-01-01',
          gender: 'male',
          fullName: 'Демо Пользователь',
          createdAt: new Date().toISOString(),
          isActive: true
        };
        
        localStorage.setItem('users', JSON.stringify([...users, newDemoUser]));
        localStorage.setItem('currentUser', JSON.stringify(newDemoUser));
      }
      
      const result = await login('demo@example.com', 'Demo123');
      
      if (result.success) {
        alert('Демо вход выполнен!');
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Demo login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Вход в аккаунт</h1>
          <p>Введите ваши данные для входа</p>
        </div>
        
        {errors.general && (
          <div className="alert alert-error">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              Email *
              {errors.email && (
                <span className="error-indicator">!</span>
              )}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              className={errors.email ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              Пароль *
              {errors.password && (
                <span className="error-indicator">!</span>
              )}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Введите пароль"
              className={errors.password ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
            
            <div className="password-actions">
              <Link to="/forgot-password" className="forgot-password">
                Забыли пароль?
              </Link>
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <span>Запомнить меня</span>
            </label>
          </div>
          
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Вход...
              </>
            ) : 'Войти'}
          </button>
          
          <div className="divider">
            <span>или</span>
          </div>
          
          <button
            type="button"
            className="demo-login-btn"
            onClick={handleDemoLogin}
            disabled={isSubmitting}
          >
            Войти как демо-пользователь
          </button>
          
          <div className="auth-footer">
            <p>
              Нет аккаунта?{' '}
              <Link to="/register" className="auth-link">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;