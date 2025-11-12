// src/components/Common/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'جاري التحميل...' }) => {
  const sizeClass = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  }[size];

  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div className={`spinner-border primary-text ${sizeClass}`} role="status">
        <span className="visually-hidden">جاري التحميل...</span>
      </div>
      {text && <span className="ms-3">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;