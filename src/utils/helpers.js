// src/utils/helpers.js
export const formatPrice = (price) => {
  return `${price} ريال`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ar-SA');
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + '...';
};