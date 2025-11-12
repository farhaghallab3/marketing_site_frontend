// src/components/Designer/DesignerCard.jsx
import React, { useState } from 'react';
import { Card, Button, Badge, Row, Col, Modal, Carousel } from 'react-bootstrap';

const DesignerCard = ({ designer, onSelect, rank }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSelect = () => {
    onSelect(designer.id);
  };

  const handleViewPortfolio = () => {
    setShowModal(true);
  };

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'rank-1';
    if (rank === 2) return 'rank-2';
    if (rank === 3) return 'rank-3';
    return 'rank-other';
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="bi bi-star-fill"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="bi bi-star-half"></i>);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="bi bi-star"></i>);
    }

    return stars;
  };

  const portfolioItems = designer.portfolio || [
    'project1.jpg',
    'project2.jpg',
    'project3.jpg',
    'project4.jpg'
  ];

  return (
    <>
      <Card className="designer-card h-100 shadow-sm position-relative">
        {rank <= 3 && (
          <div className={`rank-badge ${getRankBadgeClass(rank)}`}>
            #{rank}
          </div>
        )}

        <Card.Header className="bg-transparent border-bottom-0 pb-0">
          <Row className="align-items-center">
            <Col xs="auto">
              <div className="designer-avatar">
                <img
                  src={designer.avatar || `/api/placeholder/80/80?text=${designer.name.charAt(0)}`}
                  alt={designer.name}
                  className="rounded-circle"
                  width="80"
                  height="80"
                />
                {designer.isOnline && (
                  <span className="online-indicator"></span>
                )}
              </div>
            </Col>
            <Col>
              <div className="d-flex justify-content-between align-items-start">
                <div className="text-end">
                  <div className="rating-stars mb-1">
                    {renderStars(designer.rating)}
                  </div>
                  <small className="text-muted">
                    {designer.rating} • {designer.experience} خبرة
                  </small>
                </div>
                <div>
                  <h5 className="mb-1 fw-bold">{designer.name}</h5>
                  <Badge bg="primary" className="specialty-tag mb-2">
                    {designer.specialty}
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="pt-0">
          <p className="text-muted mb-3 designer-bio">
            {designer.bio}
          </p>

          <Row className="text-center mb-3 stats-row">
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-primary">{designer.completedProjects || 150}+</h6>
                <small className="text-muted">مشروع</small>
              </div>
            </Col>
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-success">{designer.successRate || 98}%</h6>
                <small className="text-muted">نجاح</small>
              </div>
            </Col>
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-info">{designer.responseTime || 2}س</h6>
                <small className="text-muted">استجابة</small>
              </div>
            </Col>
          </Row>

          <div className="portfolio-preview mb-3" onClick={handleViewPortfolio}>
            <div className="portfolio-count">
              <i className="bi bi-images ms-2"></i>
              {portfolioItems.length} عنصر في المعرض
            </div>
            <div className="portfolio-overlay">
              <Button variant="outline-light" size="sm">
                عرض المعرض
              </Button>
            </div>
          </div>

          <div className="skills-section mb-3">
            <small className="text-muted d-block mb-2">المهارات الرئيسية:</small>
            <div className="d-flex flex-wrap gap-1">
              {designer.skills?.map((skill, index) => (
                <Badge 
                  key={index}
                  bg="outline-secondary" 
                  text="dark"
                  className="skill-badge"
                >
                  {skill}
                </Badge>
              )) || [
                'هوية العلامة التجارية',
                'تصميم واجهة المستخدم',
                'وسائل التواصل الاجتماعي',
                'تصميم مطبوعات'
              ].map((skill, index) => (
                <Badge 
                  key={index}
                  bg="outline-secondary" 
                  text="dark"
                  className="skill-badge"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card.Body>

        <Card.Footer className="bg-transparent border-top-0">
          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              onClick={handleSelect}
              className="fw-semibold"
            >
              <i className="bi bi-check-circle ms-2"></i>
              اختر المصمم
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={handleViewPortfolio}
              size="sm"
            >
              <i className="bi bi-eye ms-2"></i>
              عرض المعرض
            </Button>
          </div>
        </Card.Footer>
      </Card>

      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            معرض أعمال {designer.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel 
            activeIndex={selectedImage}
            onSelect={setSelectedImage}
            interval={null}
            variant="dark"
          >
            {portfolioItems.map((item, index) => (
              <Carousel.Item key={index}>
                <div className="portfolio-modal-image">
                  <img
                    src={`/api/placeholder/600/400?text=مشروع ${index + 1}`}
                    alt={`عنصر المعرض ${index + 1}`}
                    className="d-block w-100 rounded"
                  />
                </div>
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h6>المشروع {index + 1}</h6>
                  <small>العميل: {designer.clients?.[index] || 'سري'}</small>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          <div className="mt-4">
            <h6>عن أعمال {designer.name}:</h6>
            <p className="text-muted">
              {designer.portfolioDescription || 
                `متخصص في ${designer.specialty.toLowerCase()}، ${designer.name} يمتلك ${designer.experience} من الخبرة في إنشاء حلول بصرية مذهلة تحقق النتائج.`}
            </p>
            
            <Row className="mt-3">
              <Col md={6}>
                <small className="text-muted d-block">متوسط وقت التسليم</small>
                <strong>{designer.deliveryTime || '٥-٧ أيام عمل'}</strong>
              </Col>
              <Col md={6}>
                <small className="text-muted d-block">رضا العملاء</small>
                <strong>{designer.successRate || 98}%</strong>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            إغلاق
          </Button>
          <Button variant="primary" onClick={handleSelect}>
            اختر {designer.name}
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        .designer-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
          overflow: hidden;
        }

        .designer-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
          box-shadow: 0 8px 25px rgba(209, 178, 138, 0.15) !important;
        }

        .rank-badge {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          z-index: 2;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .rank-1 {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #000;
        }

        .rank-2 {
          background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
          color: #000;
        }

        .rank-3 {
          background: linear-gradient(135deg, #CD7F32, #A66A2A);
          color: #fff;
        }

        .rank-other {
          background: linear-gradient(135deg, #6c757d, #495057);
          color: #fff;
        }

        .rating-stars {
          color: #ffc107;
        }

        .portfolio-preview {
          height: 120px;
          background: linear-gradient(135deg, var(--secondary-color) 0%, #1a1a1a 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
        }
      `}</style>
    </>
  );
};

export default DesignerCard;