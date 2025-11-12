// src/pages/ProjectForm.jsx
import React, { use, useState  } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectForm = () => {
  useEffect(() => {
    document.title = 'تفاصيل المشروع - Vivora Agency';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    projectName: '',
    projectDescription: '',
    files: []
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'الاسم مطلوب';
    if (!formData.mobile.trim()) newErrors.mobile = 'رقم الجوال مطلوب';
    if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'البريد الإلكتروني غير صالح';
    if (!formData.projectName.trim()) newErrors.projectName = 'اسم المشروع مطلوب';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'وصف المشروع مطلوب';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const projectData = {
        ...formData,
        selectedPackage: location.state?.selectedPackage,
        selectedDesigner: location.state?.selectedDesigner
      };
      
      localStorage.setItem('currentProject', JSON.stringify(projectData));
      navigate('/payment');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="primary-bg secondary-text">
              <h4 className="mb-0">تفاصيل المشروع</h4>
            </Card.Header>
            <Card.Body>
              {errors.general && <Alert variant="danger">{errors.general}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>الاسم الكامل *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                        required
                        placeholder="أدخل اسمك الكامل"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>رقم الجوال *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        isInvalid={!!errors.mobile}
                        required
                        placeholder="+966 5X XXX XXXX"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>البريد الإلكتروني *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    required
                    placeholder="example@email.com"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>اسم المشروع *</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.projectName}
                    required
                    placeholder="أدخل اسم المشروع"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.projectName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>وصف المشروع *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    isInvalid={!!errors.projectDescription}
                    required
                    placeholder="صف مشروعك بالتفصيل والمتطلبات التي تريدها"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.projectDescription}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>رفع الملفات (اختياري)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".jpg,.jpeg,.png,.pdf,.psd,.ai"
                  />
                  <Form.Text className="text-muted">
                    يمكنك رفع الصور المرجعية، المستندات، أو ملفات أخرى (الحد الأقصى 10MB لكل ملف)
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    المتابعة للدفع
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectForm;