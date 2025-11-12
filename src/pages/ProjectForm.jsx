// src/pages/ProjectForm.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

const ProjectForm = () => {
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
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Project description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
      // Save project data and proceed to payment
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
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Project Details</h4>
            </Card.Header>
            <Card.Body>
              {errors.general && <Alert variant="danger">{errors.general}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        isInvalid={!!errors.name}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mobile Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        isInvalid={!!errors.mobile}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.mobile}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    isInvalid={!!errors.email}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Name *</Form.Label>
                  <Form.Control
                    type="text"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    isInvalid={!!errors.projectName}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.projectName}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Project Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    isInvalid={!!errors.projectDescription}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.projectDescription}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Upload Files (Optional)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    accept=".jpg,.jpeg,.png,.pdf,.psd,.ai"
                  />
                  <Form.Text className="text-muted">
                    You can upload reference images, documents, or other files (Max 10MB each)
                  </Form.Text>
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" size="lg">
                    Proceed to Payment
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