// src/context/AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null
};

// Auth action types
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

// Auth reducer
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

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');

        if (token && userData) {
          const user = JSON.parse(userData);
          
          // Verify token validity (in real app, this would be an API call)
          const isValid = await verifyToken(token);
          
          if (isValid) {
            dispatch({
              type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
              payload: { user, token }
            });
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
            dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
      } finally {
        dispatch({ type: AUTH_ACTION_TYPES.SET_LOADING, payload: false });
      }
    };

    initializeAuth();
  }, []);

  // Mock token verification
  const verifyToken = async (token) => {
    // In a real app, this would be an API call to verify token
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple check - in reality, you'd validate JWT or check with backend
        resolve(!!token && token.length > 10);
      }, 100);
    });
  };

  // Login function
  const login = async (email, password) => {
    try {
      dispatch({ type: AUTH_ACTION_TYPES.LOGIN_START });

      // Mock API call - replace with actual authentication endpoint
      const response = await mockLoginAPI(email, password);

      if (response.success) {
        const { user, token } = response.data;

        // Store in localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        dispatch({
          type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
          payload: { user, token }
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.LOGIN_FAILURE,
        payload: error.message
      });

      return { success: false, error: error.message };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      dispatch({ type: AUTH_ACTION_TYPES.REGISTER_START });

      // Mock API call - replace with actual registration endpoint
      const response = await mockRegisterAPI(userData);

      if (response.success) {
        const { user, token } = response.data;

        // Store in localStorage
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_data', JSON.stringify(user));

        dispatch({
          type: AUTH_ACTION_TYPES.REGISTER_SUCCESS,
          payload: { user, token }
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      dispatch({
        type: AUTH_ACTION_TYPES.REGISTER_FAILURE,
        payload: error.message
      });

      return { success: false, error: error.message };
    }
  };

  // Logout function - removed navigate from here
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Clear any order-related data
    localStorage.removeItem('currentProject');
    
    dispatch({ type: AUTH_ACTION_TYPES.LOGOUT });
    
    // Note: Navigation should be handled in the component that calls logout
    // For example, in Header.jsx after logout is called
  };

  // Update user profile
  const updateUser = async (userData) => {
    try {
      // Mock API call - replace with actual update endpoint
      const response = await mockUpdateUserAPI(state.token, userData);

      if (response.success) {
        const updatedUser = { ...state.user, ...userData };
        
        // Update localStorage
        localStorage.setItem('user_data', JSON.stringify(updatedUser));

        dispatch({
          type: AUTH_ACTION_TYPES.UPDATE_USER,
          payload: userData
        });

        return { success: true };
      } else {
        throw new Error(response.message || 'Update failed');
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTION_TYPES.CLEAR_ERROR });
  };

  // Check if user has specific role (for future role-based access)
  const hasRole = (role) => {
    return state.user?.roles?.includes(role) || false;
  };

  // Check if user can access a specific feature
  const canAccess = (permission) => {
    if (!state.isAuthenticated) return false;
    
    // Simple permission check - extend as needed
    const userPermissions = state.user?.permissions || [];
    return userPermissions.includes(permission);
  };

  // Value to be provided by context
  const value = {
    // State
    user: state.user,
    token: state.token,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,

    // Actions
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

// Mock API functions - Replace with actual API calls
const mockLoginAPI = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock validation
      if (email === 'demo@example.com' && password === 'password') {
        resolve({
          success: true,
          data: {
            user: {
              id: 1,
              email: 'demo@example.com',
              name: 'Demo User',
              avatar: null,
              phone: '+1234567890',
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
          message: 'Invalid email or password'
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

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Higher Order Component for protecting routes - removed useNavigate
export const withAuth = (Component) => {
  return function ProtectedComponent(props) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center align-items-center min-vh-50">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
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
                <h4>Authentication Required</h4>
                <p>Please log in to access this page.</p>
                <a href="/login" className="btn btn-primary">
                  Go to Login
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

// REMOVED useRequireAuth hook since it uses useNavigate
// This should be implemented in individual components instead