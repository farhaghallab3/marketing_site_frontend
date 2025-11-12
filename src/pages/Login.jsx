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

  useEffect(() => {
    document.title = 'تسجيل الدخول - Vivora Agency';
  }, []);
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

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
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 6) {
      newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    const { name, email, phone, password, confirmPassword, acceptTerms } = formData.register;

    if (!name.trim()) {
      newErrors.name = 'الاسم الكامل مطلوب';
    }

    if (!email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'البريد الإلكتروني غير صالح';
    }

    if (!phone.trim()) {
      newErrors.phone = 'رقم الجوال مطلوب';
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = 'رقم الجوال غير صالح';
    }

    if (!password) {
      newErrors.password = 'كلمة المرور مطلوبة';
    } else if (password.length < 8) {
      newErrors.password = 'كلمة المرور يجب أن تكون 8 أحرف على الأقل';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = 'يجب أن تحتوي كلمة المرور على أحرف كبيرة وصغيرة وأرقام';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'يرجى تأكيد كلمة المرور';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'كلمات المرور غير متطابقة';
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = 'يجب الموافقة على الشروط والأحكام';
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
      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: 'حدث خطأ غير متوقع' });
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

      if (!result.success) {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: 'حدث خطأ غير متوقع' });
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
              <div className="spinner-border primary-text" role="status">
                <span className="visually-hidden">جاري التحميل...</span>
              </div>
              <p className="mt-3">جاري التحميل...</p>
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
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold primary-text mb-3">
              أهلاً بعودتك
            </h1>
            <p className="text-muted">
              سجل الدخول إلى حسابك أو أنشئ حساباً جديداً لتبدأ مع خدماتنا التصميمية.
            </p>
          </div>

          <Card className="shadow-lg border-0">
            <Card.Body className="p-4">
              <Tabs
                activeKey={activeTab}
                onSelect={(tab) => setActiveTab(tab)}
                className="mb-4 border-bottom-0"
                justify
              >
                <Tab eventKey="login" title="تسجيل الدخول">
                  <div className="tab-content p-3">
                    <Alert variant="info" className="d-flex align-items-center">
                      <i className="bi bi-info-circle ms-2"></i>
                      <div>
                        <strong>حساب تجريبي:</strong> استخدم demo@example.com / password
                        <Button
                          variant="outline-info"
                          size="sm"
                          className="ms-2"
                          onClick={handleDemoLogin}
                          disabled={isSubmitting}
                        >
                          تعبئة تلقائية
                        </Button>
                      </div>
                    </Alert>

                    {error && (
                      <Alert variant="danger" dismissible onClose={clearError}>
                        <i className="bi bi-exclamation-triangle ms-2"></i>
                        {error}
                      </Alert>
                    )}

                    {errors.general && (
                      <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle ms-2"></i>
                        {errors.general}
                      </Alert>
                    )}

                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="أدخل بريدك الإلكتروني"
                          value={formData.login.email}
                          onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="أدخل كلمة المرور"
                          value={formData.login.password}
                          onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                        <div className="text-start mt-2">
                          <Link to="/forgot-password" className="text-decoration-none small">
                            نسيت كلمة المرور؟
                          </Link>
                        </div>
                      </Form.Group>

                      <div className="d-grid">
                        <Button
                          variant="primary"
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
                              جاري تسجيل الدخول...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-box-arrow-in-left ms-2"></i>
                              تسجيل الدخول
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>

                    <div className="text-center my-4">
                      <span className="text-muted">أو تابع باستخدام</span>
                    </div>

                    <div className="d-grid gap-2">
                      <Button variant="outline-dark" disabled>
                        <i className="bi bi-google ms-2"></i>
                        المتابعة مع جوجل
                      </Button>
                    </div>
                  </div>
                </Tab>

                <Tab eventKey="register" title="إنشاء حساب">
                  <div className="tab-content p-3">
                    {error && (
                      <Alert variant="danger" dismissible onClose={clearError}>
                        <i className="bi bi-exclamation-triangle ms-2"></i>
                        {error}
                      </Alert>
                    )}

                    {errors.general && (
                      <Alert variant="danger">
                        <i className="bi bi-exclamation-triangle ms-2"></i>
                        {errors.general}
                      </Alert>
                    )}

                    <Form onSubmit={handleRegister}>
                      <Form.Group className="mb-3">
                        <Form.Label>الاسم الكامل</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="أدخل اسمك الكامل"
                          value={formData.register.name}
                          onChange={(e) => handleInputChange('register', 'name', e.target.value)}
                          isInvalid={!!errors.name}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="أدخل بريدك الإلكتروني"
                          value={formData.register.email}
                          onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                          isInvalid={!!errors.email}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>رقم الجوال</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="+966 5X XXX XXXX"
                          value={formData.register.phone}
                          onChange={(e) => handleInputChange('register', 'phone', e.target.value)}
                          isInvalid={!!errors.phone}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.phone}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>كلمة المرور</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="أنشئ كلمة مرور قوية"
                          value={formData.register.password}
                          onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                          isInvalid={!!errors.password}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.password}
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                          يجب أن تكون 8 أحرف على الأقل وتحتوي على أحرف كبيرة وصغيرة وأرقام.
                        </Form.Text>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Label>تأكيد كلمة المرور</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="أعد إدخال كلمة المرور"
                          value={formData.register.confirmPassword}
                          onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                          isInvalid={!!errors.confirmPassword}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.confirmPassword}
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-4">
                        <Form.Check
                          type="checkbox"
                          label={
                            <span>
                              أوافق على{' '}
                              <Link to="/terms" className="text-decoration-none">
                                الشروط والأحكام
                              </Link>{' '}
                              و{' '}
                              <Link to="/privacy" className="text-decoration-none">
                                سياسة الخصوصية
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

                      <div className="d-grid">
                        <Button
                          variant="warning"
                          type="submit"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm ms-2" role="status"></span>
                              جاري إنشاء الحساب...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-person-plus ms-2"></i>
                              إنشاء حساب
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

          <div className="text-center mt-4">
            <p className="text-muted">
              بالمتابعة، فإنك توافق على{' '}
              <Link to="/terms" className="text-decoration-none">شروط الخدمة</Link>
              {' '}و{' '}
              <Link to="/privacy" className="text-decoration-none">سياسة الخصوصية</Link>.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;