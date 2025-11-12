// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

const AUTH_ACTION_TYPES = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  UPDATE_USER: 'UPDATE_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_LOADING: 'SET_LOADING'
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.LOGIN_START:
    case AUTH_ACTION_TYPES.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
    case AUTH_ACTION_TYPES.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null
      };

    case AUTH_ACTION_TYPES.LOGIN_FAILURE:
    case AUTH_ACTION_TYPES.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload
      };

    case AUTH_ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        isLoading: false
      };

    case AUTH_ACTION_TYPES.UPDATE_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };

    case AUTH_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    case AUTH_ACTION_TYPES.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          const user = JSON.parse(userData);
          
          const isValid = await verifyToken(token);
          
          if (isValid) {
            dispatch({
              type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
              payload: { user, token }
            });
          } else {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
          }
        }
      } catch (error) {
        console.error('خطأ في تهيئة المصادقة:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
      } finally {
        dispatch({ type: AUTH_ACTION_TYPES.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  const verifyToken = async (token) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(!!token && token.length > 10);
      }, 100);
    });
  };

  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });

      const response = await mockLoginAPI(email, password);

      if (response.success) {
        const { user, token } = response.data;

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        dispatch({
          type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
          payload: { user, token }
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'فشل تسجيل الدخول');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
        payload: error.message
      });

      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTION_TYPES.REGISTER_START });

      const response = await mockRegisterAPI(userData);

      if (response.success) {
        const { user, token } = response.data;

        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        dispatch({
          type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
          payload: { user, token }
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'فشل إنشاء الحساب');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
        payload: error.message
      });

      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('currentProject');
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
  };

  const updateUser = async (userData) => {
    try {
      const response = await mockUpdateUserAPI(state.token, userData);

      if (response.success) {
        const updatedUser = { ...state.user, ...userData };
        localStorage.setItem('user_data', JSON.stringify(updatedUser));

        dispatch({
          type: AUTH_ACTION_TYPES.UPDATE_USER,
          payload: userData
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'فشل التحديث');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: AUTH_ACTION_TYPES.CLEAR_ERROR });
  };

  const hasRole = (role) => {
    return state.user?.roles?.includes(role) || false;
  };

  const canAccess = (permission) => {
    if (!state.isAuthenticated) return false;
    const userPermissions = state.user?.permissions || [];
    return userPermissions.includes(permission);
  };

  const value = {
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    login,
    register,
    logout,
    updateUser,
    clearError,
    hasRole,
    canAccess
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

const mockLoginAPI = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          success: true,
          data: {
            user: {
              id: 1,
              email: 'demo@example.com',
              name: 'مستخدم تجريبي',
              avatar: null,
              phone: '+٩٦٦٥٥١٢٣٤٥٦٧٨',
              createdAt: new Date().toISOString(),
              roles: ['client'],
              permissions: ['create_order', 'view_orders', 'upload_files']
            },
            token: 'mock_jwt_token_' + Math.random().toString(36).substr(2)
          }
        });
      } else {
        resolve({
          success: false,
          message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
        });
      }
    }, 1500);
  });
};

const mockRegisterAPI = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          user: {
            id: Date.now(),
            email: userData.email,
            name: userData.name,
            avatar: null,
            phone: userData.phone,
            createdAt: new Date().toISOString(),
            roles: ['client'],
            permissions: ['create_order', 'view_orders', 'upload_files']
          },
          token: 'mock_jwt_token_' + Math.random().toString(36).substr(2)
        }
      });
    }, 1500);
  });
};

const mockUpdateUserAPI = async (token, userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: userData
      });
    }, 1000);
  });
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('يجب استخدام useAuth داخل AuthProvider');
  }
  
  return context;
};

export const withAuth = (Component) => {
  return function ProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="spinner-border primary-text" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      );
    }
    
    if (!isAuthenticated) {
      return (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="alert alert-warning">
                <h4>مصادقة مطلوبة</h4>
                <p>يرجى تسجيل الدخول للوصول إلى هذه الصفحة.</p>
                <a href="/login" className="btn btn-primary">
                  الانتقال لتسجيل الدخول
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
};