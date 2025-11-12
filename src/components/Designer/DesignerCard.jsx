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
        {/* Rank Badge */}
        {rank <= 3 && (
          <div className={`rank-badge ${getRankBadgeClass(rank)}`}>
            #{rank}
          </div>
        )}

        {/* Designer Header */}
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
                <div>
                  <h5 className="mb-1 fw-bold">{designer.name}</h5>
                  <Badge bg="primary" className="specialty-tag mb-2">
                    {designer.specialty}
                  </Badge>
                </div>
                <div className="text-end">
                  <div className="rating-stars mb-1">
                    {renderStars(designer.rating)}
                  </div>
                  <small className="text-muted">
                    {designer.rating} • {designer.experience} exp
                  </small>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Header>

        <Card.Body className="pt-0">
          {/* Bio */}
          <p className="text-muted mb-3 designer-bio">
            {designer.bio}
          </p>

          {/* Stats */}
          <Row className="text-center mb-3 stats-row">
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-primary">{designer.completedProjects || 150}+</h6>
                <small className="text-muted">Projects</small>
              </div>
            </Col>
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-success">{designer.successRate || 98}%</h6>
                <small className="text-muted">Success</small>
              </div>
            </Col>
            <Col>
              <div className="stat-item">
                <h6 className="fw-bold mb-1 text-info">{designer.responseTime || 2}h</h6>
                <small className="text-muted">Response</small>
              </div>
            </Col>
          </Row>

          {/* Portfolio Preview */}
          <div className="portfolio-preview mb-3" onClick={handleViewPortfolio}>
            <div className="portfolio-count">
              <i className="bi bi-images me-2"></i>
              {portfolioItems.length} Portfolio Items
            </div>
            <div className="portfolio-overlay">
              <Button variant="outline-light" size="sm">
                View Gallery
              </Button>
            </div>
          </div>

          {/* Skills */}
          <div className="skills-section mb-3">
            <small className="text-muted d-block mb-2">Key Skills:</small>
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
                'Brand Identity',
                'UI/UX Design',
                'Social Media',
                'Print Design'
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
              <i className="bi bi-check-circle me-2"></i>
              Select Designer
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={handleViewPortfolio}
              size="sm"
            >
              <i className="bi bi-eye me-2"></i>
              View Portfolio
            </Button>
          </div>
        </Card.Footer>
      </Card>

      {/* Portfolio Modal */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {designer.name}'s Portfolio
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Portfolio Carousel */}
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
                    src={`/api/placeholder/600/400?text=Project ${index + 1}`}
                    alt={`Portfolio item ${index + 1}`}
                    className="d-block w-100 rounded"
                  />
                </div>
                <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                  <h6>Project {index + 1}</h6>
                  <small>Client: {designer.clients?.[index] || 'Confidential'}</small>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Project Details */}
          <div className="mt-4">
            <h6>About {designer.name}'s Work:</h6>
            <p className="text-muted">
              {designer.portfolioDescription || 
                `Specializing in ${designer.specialty.toLowerCase()}, ${designer.name} brings ${designer.experience} of experience to create stunning visual solutions that drive results.`}
            </p>
            
            <Row className="mt-3">
              <Col md={6}>
                <small className="text-muted d-block">Average Delivery Time</small>
                <strong>{designer.deliveryTime || '5-7 business days'}</strong>
              </Col>
              <Col md={6}>
                <small className="text-muted d-block">Client Satisfaction</small>
                <strong>{designer.successRate || 98}%</strong>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSelect}>
            Select {designer.name}
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
          border-color: #007bff;
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15) !important;
        }

        .designer-avatar {
          position: relative;
        }

        .online-indicator {
          position: absolute;
          bottom: 5px;
          right: 5px;
          width: 12px;
          height: 12px;
          background-color: #28a745;
          border: 2px solid white;
          border-radius: 50%;
        }

        .rank-badge {
          position: absolute;
          top: -10px;
          left: -10px;
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

        .designer-bio {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 1.4;
        }

        .stats-row {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 10px 0;
          margin: 0 -10px;
        }

        .stat-item {
          padding: 5px;
        }

        .portfolio-preview {
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        .portfolio-preview:hover {
          transform: scale(1.02);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .portfolio-preview:hover .portfolio-overlay {
          opacity: 1;
        }

        .portfolio-count {
          position: relative;
          z-index: 1;
        }

        .portfolio-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .skill-badge {
          border: 1px solid #dee2e6;
          font-weight: normal;
          padding: 0.25em 0.6em;
        }

        .portfolio-modal-image {
          border-radius: 8px;
          overflow: hidden;
          background: #f8f9fa;
          min-height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Animation for card appearance */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .designer-card {
          animation: fadeInUp 0.5s ease-out;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .designer-avatar img {
            width: 60px;
            height: 60px;
          }
          
          .portfolio-preview {
            height: 100px;
          }
          
          .stats-row {
            padding: 8px 0;
          }
        }

        @media (max-width: 576px) {
          .rank-badge {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default DesignerCard;