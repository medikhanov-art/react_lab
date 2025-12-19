import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Profile.css';

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    birthDate: currentUser?.birthDate || '',
    gender: currentUser?.gender || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setMessage({ type: 'success', text: 'Профиль успешно обновлен!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: 'Ошибка при обновлении профиля' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Произошла ошибка' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      logout();
      window.location.href = '/';
    }
  };

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-empty">
          <h2>Пожалуйста, войдите в систему</h2>
          <p>Для просмотра профиля необходимо авторизоваться</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {currentUser.firstName?.charAt(0) || 'U'}
          </div>
          <div className="profile-info">
            <h1>{currentUser.fullName || 'Пользователь'}</h1>
            <p>{currentUser.email}</p>
            <p>Участник с {formatDate(currentUser.createdAt)}</p>
          </div>
        </div>
        
        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}
        
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Имя</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Фамилия</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Телефон</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Дата рождения</label>
              <input
                type="date"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label>Пол</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="">Не указан</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другой</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setIsEditing(false)}
                disabled={isSubmitting}
              >
                Отмена
              </button>
              <button
                type="submit"
                className="primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-group">
              <h3>Личная информация</h3>
              <div className="detail-row">
                <span>Имя:</span>
                <span>{currentUser.firstName} {currentUser.lastName}</span>
              </div>
              <div className="detail-row">
                <span>Email:</span>
                <span>{currentUser.email}</span>
              </div>
              <div className="detail-row">
                <span>Телефон:</span>
                <span>{currentUser.phone || 'Не указан'}</span>
              </div>
              <div className="detail-row">
                <span>Дата рождения:</span>
                <span>
                  {currentUser.birthDate 
                    ? formatDate(currentUser.birthDate)
                    : 'Не указана'
                  }
                </span>
              </div>
              <div className="detail-row">
                <span>Пол:</span>
                <span>
                  {currentUser.gender === 'male' ? 'Мужской' :
                   currentUser.gender === 'female' ? 'Женский' :
                   currentUser.gender === 'other' ? 'Другой' : 'Не указан'}
                </span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                Редактировать профиль
              </button>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;