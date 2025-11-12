// src/pages/Payment.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { processPayment, sendNotifications } from '../services/notifications';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const projectData = JSON.parse(localStorage.getItem('currentProject') || '{}');

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Process payment
      const paymentResult = await processPayment(projectData);
      
      if (paymentResult.success) {
        // Send notifications
        await sendNotifications(projectData);
        
        // Save order to database
        const order = {
          id: Date.now(),
          ...projectData,
          status: 'under_review',
          createdAt: new Date().toISOString(),
          paymentId: paymentResult.paymentId
        };
        
        // Save to localStorage (replace with API call in production)
        const existingOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        localStorage.setItem('userOrders', JSON.stringify([...existingOrders, order]));
        
        // Clear current project
        localStorage.removeItem('currentProject');
        
        navigate('/dashboard', { 
          state: { 
            message: 'Payment successful! Your order has been placed.' 
          } 
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Payment</h4>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                <strong>Order Summary:</strong><br />
                Project: {projectData.projectName}<br />
                Package: {projectData.selectedPackage}<br />
                Amount: $299.00
              </Alert>

              <Form>
                <Form.Group className="mb-4">
                  <Form.Label>Select Payment Method</Form.Label>
                  <div>
                    <Form.Check
                      type="radio"
                      label="Credit/Debit Card"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="PayPal"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mb-2"
                    />
                    <Form.Check
                      type="radio"
                      label="Bank Transfer"
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
                        <Form.Label>Card Number</Form.Label>
                        <Form.Control type="text" placeholder="1234 5678 9012 3456" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control type="text" placeholder="MM/YY" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="123" />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Cardholder Name</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" />
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
                    {processing ? 'Processing...' : `Pay $299.00`}
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