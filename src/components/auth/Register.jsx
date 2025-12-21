import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthDate: '',
    gender: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Проверка имени
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Введите имя';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа';
    }
    
    // Проверка фамилии
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Введите фамилию';
    }
    
    // Проверка email
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }
    
    // Проверка телефона
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите телефон';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Введите корректный номер телефона';
    }
    
    // Проверка пароля
    if (!formData.password) {
      newErrors.password = 'Введите пароль';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    } else if (!/(?=.*[a-zа-я])(?=.*[A-ZА-Я])/.test(formData.password)) {
      newErrors.password = 'Пароль должен содержать заглавные и строчные буквы';
    }
    
    // Проверка подтверждения пароля
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Подтвердите пароль';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    
    // Проверка даты рождения
    if (!formData.birthDate) {
      newErrors.birthDate = 'Введите дату рождения';
    } else {
      const birthDate = new Date(formData.birthDate);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18) {
        newErrors.birthDate = 'Вам должно быть не менее 18 лет';
      }
    }
    
    // Проверка согласия с условиями
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Необходимо согласие с условиями';
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
      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
        birthDate: formData.birthDate,
        gender: formData.gender,
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`
      };
      
      const result = await register(userData);
      
      if (result.success) {
        alert('Регистрация успешна! Добро пожаловать!');
        navigate('/profile');
      } else {
        alert(result.error || 'Ошибка при регистрации');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Произошла ошибка при регистрации');
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
  };

  const formatPhoneNumber = (value) => {
    const phone = value.replace(/\D/g, '');
    if (phone.length === 0) return '';
    
    if (!phone.startsWith('+')) {
      return `+${phone}`;
    }
    
    return phone;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleInputChange({
      target: {
        name: 'phone',
        value: formatted
      }
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Регистрация</h1>
          <p>Создайте аккаунт для доступа ко всем функциям</p>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">
                Имя *
                {errors.firstName && (
                  <span className="error-indicator">!</span>
                )}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Введите ваше имя"
                className={errors.firstName ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <span className="error-message">{errors.firstName}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">
                Фамилия *
                {errors.lastName && (
                  <span className="error-indicator">!</span>
                )}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Введите вашу фамилию"
                className={errors.lastName ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <span className="error-message">{errors.lastName}</span>
              )}
            </div>
          </div>
          
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
            <label htmlFor="phone">
              Телефон *
              {errors.phone && (
                <span className="error-indicator">!</span>
              )}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="+996 555 55 55 55"
              className={errors.phone ? 'error' : ''}
              disabled={isSubmitting}
            />
            {errors.phone && (
              <span className="error-message">{errors.phone}</span>
            )}
          </div>
          
          <div className="form-row">
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
                placeholder="Минимум 6 символов"
                className={errors.password ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Подтвердите пароль *
                {errors.confirmPassword && (
                  <span className="error-indicator">!</span>
                )}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Повторите пароль"
                className={errors.confirmPassword ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="birthDate">
                Дата рождения *
                {errors.birthDate && (
                  <span className="error-indicator">!</span>
                )}
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                className={errors.birthDate ? 'error' : ''}
                disabled={isSubmitting}
              />
              {errors.birthDate && (
                <span className="error-message">{errors.birthDate}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="gender">Пол</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={isSubmitting}
              >
                <option value="">Не указан</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другой</option>
              </select>
            </div>
          </div>
          
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={errors.agreeTerms ? 'error' : ''}
              />
              <span>
                Я соглашаюсь с{' '}
                <a href="#terms" className="terms-link">
                  условиями использования
                </a>{' '}
                и{' '}
                <a href="#privacy" className="terms-link">
                  политикой конфиденциальности
                </a>
                *
              </span>
            </label>
            {errors.agreeTerms && (
              <span className="error-message">{errors.agreeTerms}</span>
            )}
          </div>
          
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner"></span>
                Регистрация...
              </>
            ) : 'Зарегистрироваться'}
          </button>
          
          <div className="auth-footer">
            <p>
              Уже есть аккаунт?{' '}
              <Link to="/login" className="auth-link">
                Войти
              </Link>
            </p>
          </div>
        </form>
        
        <div className="auth-benefits">
          <h3>Преимущества регистрации:</h3>
          <ul>
            <li>✓ История заказов и бронирований</li>
            <li>✓ Быстрое оформление покупок</li>
            <li>✓ Персональные рекомендации</li>
            <li>✓ Специальные предложения</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Register;