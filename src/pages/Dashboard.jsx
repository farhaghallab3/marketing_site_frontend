// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = 'لوحة التحكم - Vivora Agency';
  }, []);

  useEffect(() => {
    const userOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
    setOrders(userOrders);
    
    setUser({ 
      name: 'محمد أحمد', 
      email: 'mohammed@example.com',
      orderCount: userOrders.length
    });
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
      'under_review': 'قيد المراجعة',
      'in_progress': 'قيد التنفيذ',
      'completed': 'مكتمل',
      'delivered': 'تم التسليم'
    };
    return texts[status] || status;
  };

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2>لوحة التحكم</h2>
          <p className="lead">تابع طلباتك وأدر مشاريعك</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>الطلبات النشطة</Card.Title>
              <h3 className="primary-text">{orders.filter(order => order.status !== 'delivered').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>المكتملة</Card.Title>
              <h3 className="primary-text">{orders.filter(order => order.status === 'delivered').length}</h3>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>إجمالي الإنفاق</Card.Title>
              <h3 className="primary-text">{orders.length * 299} ريال</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h5 className="mb-0">طلباتي</h5>
            </Card.Header>
            <Card.Body>
              {orders.length === 0 ? (
                <p className="text-center text-muted">
                  لم تقم بوضع أي طلبات بعد.
                </p>
              ) : (
                <Table responsive>
                  <thead>
                    <tr>
                      <th>رقم الطلب</th>
                      <th>اسم المشروع</th>
                      <th>التاريخ</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.projectName}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString('ar-SA')}</td>
                        <td>
                          <Badge bg={getStatusVariant(order.status)}>
                            {getStatusText(order.status)}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm">
                            عرض التفاصيل
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

      {orders.length > 0 && (
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Header>
                <h5 className="mb-0">معلومات الحساب</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>الاسم:</strong> {user?.name}
                    </div>
                    <div className="mb-3">
                      <strong>البريد الإلكتروني:</strong> {user?.email}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="mb-3">
                      <strong>إجمالي الطلبات:</strong> {orders.length}
                    </div>
                    <div className="mb-3">
                      <strong>العضو منذ:</strong> {new Date().toLocaleDateString('ar-SA')}
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;