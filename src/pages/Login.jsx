// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Tabs } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [formData, setFormData] = useState({
    login: {
      email: '',
      password: ''
    },
    register: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Clear errors when switching tabs
  useEffect(() => {
    clearError();
    setErrors({});
  }, [activeTab, clearError]);

  const handleInputChange = (tab, field, value) => {
    setFormData(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [field]: value
      }
    }));

    // Clear field-specific error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateLoginForm = () => {
    const newErrors = {};
    const { email, password } = formData.login;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    const { name, email, phone, password, confirmPassword, acceptTerms } = formData.register;

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and numbers';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateLoginForm()) return;

    setIsSubmitting(true);
    const { email, password } = formData.login;

    try {
      const result = await login(email, password);
      if (result.success) {
        // Navigation will be handled by the useEffect
      } else {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    clearError();

    if (!validateRegisterForm()) return;

    setIsSubmitting(true);
    const { name, email, phone, password } = formData.register;

    try {
      const result = await register({
        name,
        email,
        phone,
        password
      });

      if (result.success) {
        // Navigation will be handled by the useEffect
      } else {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async () => {
    setFormData(prev => ({
      ...prev,
      login: {
        email: 'demo@example.com',
        password: 'password'
      }
    }));

    // Auto-submit after a brief delay to show the filled fields
    setTimeout(async () => {
      setIsSubmitting(true);
      await login('demo@example.com', 'password');
      setIsSubmitting(false);
    }, 500);
  };

  if (isLoading) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3">Loading...</p>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary mb-3">
              Welcome Back
            </h1>
            <p className="text-muted">
              Sign in to your account or create a new one to get started with our design services.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              {/* Tabs */}
              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                className="mb-4 border-bottom-0"
                justify
              >
                <Tab eventKey="login" title="Sign In">
                  <div className="tab-content p-3">
                    {/* Demo Account Alert */}
                    <Alert variant="info" className="d-flex align-items-center">
                      <i className="bi bi-info-circle me-2"></i>
                      <div>
                        <strong>Demo Account:</strong> Use demo@example.com / password
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="ms-2"
                          onClick={handleDemoLogin}
                          disabled={isSubmitting}
                        >
                          Auto-fill
                        </Button>
                      </div>
                    </Alert>

                    {error && (
                      <Alert variant="danger" dismissible onClose={clearError}>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                      </Alert>
                    )}

                    {errors.general && (
                      <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {errors.general}
                      </Alert>
                    )}

                    <Form onSubmit={handleLogin}>
                      {/* Email */}
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={formData.login.email}
                          onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Password */}
                      <Form.Group className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter your password"
                          value={formData.login.password}
                          onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                        <div className="text-end mt-2">
                          <Link to="/forgot-password" className="text-decoration-none small">
                            Forgot password?
                          </Link>
                        </div>
                      </Form.Group>

                      {/* Submit Button */}
                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Signing In...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-box-arrow-in-right me-2"></i>
                              Sign In
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>

                    {/* Divider */}
                    <div className="text-center my-4">
                      <span className="text-muted">or continue with</span>
                    </div>

                    {/* Social Login */}
                    <div className="d-grid gap-2">
                      <Button variant="outline-dark" disabled>
                        <i className="bi bi-google me-2"></i>
                        Continue with Google
                      </Button>
                      <Button variant="outline-primary" disabled>
                        <i className="bi bi-facebook me-2"></i>
                        Continue with Facebook
                      </Button>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="register" title="Create Account">
                  <div className="tab-content p-3">
                    {error && (
                      <Alert variant="danger" dismissible onClose={clearError}>
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {error}
                      </Alert>
                    )}

                    {errors.general && (
                      <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        {errors.general}
                      </Alert>
                    )}

                    <Form onSubmit={handleRegister}>
                      {/* Full Name */}
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter your full name"
                          value={formData.register.name}
                          onChange={(e) => handleInputChange('register', 'name', e.target.value)}
                          isInvalid={!!errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Email */}
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={formData.register.email}
                          onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Phone */}
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.register.phone}
                          onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                          isInvalid={!!errors.phone}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Password */}
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Create a strong password"
                          value={formData.register.password}
                          onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          Must be at least 8 characters with uppercase, lowercase, and numbers.
                        </Form.Text>
                      </Form.Group>

                      {/* Confirm Password */}
                      <Form.Group className="mb-4">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.register.confirmPassword}
                          onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                          isInvalid={!!errors.confirmPassword}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Terms and Conditions */}
                      <Form.Group className="mb-4">
                        <Form.Check
                          type="checkbox"
                          label={
                            <span>
                              I agree to the{' '}
                              <Link to="/terms" className="text-decoration-none">
                                Terms and Conditions
                              </Link>{' '}
                              and{' '}
                              <Link to="/privacy" className="text-decoration-none">
                                Privacy Policy
                              </Link>
                            </span>
                          }
                          checked={formData.register.acceptTerms}
                          onChange={(e) => handleInputChange('register', 'acceptTerms', e.target.checked)}
                          isInvalid={!!errors.acceptTerms}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.acceptTerms}
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Submit Button */}
                      <div className="d-grid">
                        <Button
                          variant="warning"
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                              Creating Account...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-person-plus me-2"></i>
                              Create Account
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </div>
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>

          {/* Additional Links */}
          <div className="text-center mt-4">
            <p className="text-muted">
              By continuing, you agree to our{' '}
              <Link to="/terms" className="text-decoration-none">Terms of Service</Link>
              {' '}and{' '}
              <Link to="/privacy" className="text-decoration-none">Privacy Policy</Link>.
            </p>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .tab-content {
          min-height: 400px;
        }

        .nav-tabs .nav-link {
          border: none;
          color: #6c757d;
          font-weight: 500;
          padding: 1rem 1.5rem;
        }

        .nav-tabs .nav-link.active {
          color: var(--bs-primary);
          background: transparent;
          border-bottom: 3px solid var(--bs-primary);
        }

        .nav-tabs .nav-link:hover {
          border: none;
          border-bottom: 3px solid #dee2e6;
        }

        .card {
          border-radius: 1rem;
          overflow: hidden;
        }

        .form-control {
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
        }

        .btn {
          border-radius: 0.5rem;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .my-5 {
            margin-top: 2rem !important;
            margin-bottom: 2rem !important;
          }

          .display-5 {
            font-size: 2rem;
          }

          .nav-tabs .nav-link {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default Login;