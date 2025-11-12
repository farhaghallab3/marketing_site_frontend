// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user orders from localStorage
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(userOrders);
    
    // In a real app, this would come from authentication context
    setUser({ name: 'John Doe', email: 'john@example.com' });
  }, []);

  const getStatusVariant = (status) => {
    const variants = {
      'under_review': 'warning',
      'in_progress': 'info',
      'completed': 'success',
      'delivered': 'primary'
    };
    return variants[status] || 'secondary';
  };

  const getStatusText = (status) => {
    const texts = {
      'under_review': 'Under Review',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'delivered': 'Delivered'
    };
    return texts[status] || status;
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>My Dashboard</h2>
          <p className="lead">Track your orders and manage your projects</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Active Orders</Card.Title>
              <h3>{orders.filter(order => order.status !== 'delivered').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Completed</Card.Title>
              <h3>{orders.filter(order => order.status === 'delivered').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Total Spent</Card.Title>
              <h3>${orders.length * 299}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">My Orders</h5>
            </Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p className="text-center text-muted">
                  You haven't placed any orders yet.
                </p>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Project Name</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.projectName}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={getStatusVariant(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;