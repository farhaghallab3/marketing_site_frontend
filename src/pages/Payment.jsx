// src/pages/Payment.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { processPayment, sendNotifications } from '../services/notifications';
import { useEffect } from 'react';

const Payment = () => {
   useEffect(() => {
    document.title = 'Vivora Agency - الدفع';
  }, []);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const projectData = JSON.parse(localStorage.getItem('currentProject') || '{}');

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      const paymentResult = await processPayment(projectData);
      
      if (paymentResult.success) {
        await sendNotifications(projectData);
        
        const order = {
          id: Date.now(),
          ...projectData,
          status: 'under_review',
          createdAt: new Date().toISOString(),
          paymentId: paymentResult.paymentId
        };
        
        const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        localStorage.setItem('userOrders', JSON.stringify([...existingOrders, order]));
        
        localStorage.removeItem('currentProject');
        
        navigate('/dashboard', { 
          state: { 
            message: 'تم الدفع بنجاح! تم تقديم طلبك.' 
          } 
        });
      }
    } catch (error) {
      console.error('فشل الدفع:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="primary-bg secondary-text">
              <h4 className="mb-0">الدفع</h4>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <strong>ملخص الطلب:</strong><br />
                المشروع: {projectData.projectName}<br />
                الباقة: {projectData.selectedPackage}<br />
                المبلغ: ٢٩٩ ريال
              </Alert>

              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>اختر طريقة الدفع</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="بطاقة ائتمان/مدى"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="باي بال"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="تحويل بنكي"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                  </div>
                </Form.Group>

                {paymentMethod === 'card' && (
                  <Row>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>رقم البطاقة</Form.Label>
                        <Form.Control type="text" placeholder="١٢٣٤ ٥٦٧٨ ٩٠١٢ ٣٤٥٦" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>تاريخ الانتهاء</Form.Label>
                        <Form.Control type="text" placeholder="شهر/سنة" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="١٢٣" />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>اسم حامل البطاقة</Form.Label>
                        <Form.Control type="text" placeholder="الاسم كما هو على البطاقة" />
                      </Form.Group>
                    </Col>
                  </Row>
                )}

                <div className="d-grid">
                  <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handlePayment}
                    disabled={processing}
                  >
                    {processing ? 'جاري المعالجة...' : `دفع ٢٩٩ ريال`}
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

export default Payment;