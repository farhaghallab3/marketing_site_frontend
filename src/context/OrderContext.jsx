// src/context/OrderContext.jsx
import React, { createContext, useContext, useReducer } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDER':
      return {
        ...state,
        currentOrder: action.payload
      };
    case 'UPDATE_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        )
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    default:
      return state;
  }
};

const initialState = {
  currentOrder: null,
  orders: []
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return (
    <OrderContext.Provider value={{ state, dispatch }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('يجب استخدام useOrder داخل OrderProvider');
  }
  return context;
};