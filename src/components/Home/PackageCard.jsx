// src/components/Home/PackageCard.jsx
import React, { useRef, useEffect } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const PackageCard = ({ package: pkg, onSelect, featured = false }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`package-card-wrapper ${featured ? 'featured' : ''}`} ref={cardRef}>
      <Card className={`card-modern package-card ${featured ? 'featured-card' : ''}`}>
        {featured && (
          <div className="featured-badge">
            <span>الأكثر طلباً</span>
          </div>
        )}
        
        <Card.Header className="package-header">
          <div className="package-icon">
            <i className={`bi ${pkg.icon || 'bi-star'}`}></i>
          </div>
          <h4 className="package-name">{pkg.name}</h4>
          <div className="package-price">
            <span className="price">{pkg.price}</span>
          </div>
        </Card.Header>
        
        <Card.Body className="package-body">
          <p className="package-description">{pkg.description}</p>
          
          <ListGroup variant="flush" className="package-features">
            {pkg.features.map((feature, index) => (
              <ListGroup.Item key={index} className="feature-item">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>{feature}</span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
        
        <Card.Footer className="package-footer">
          <Button 
            className={`btn-modern ${featured ? 'btn-primary-modern' : 'btn-secondary-modern'} w-100`}
            onClick={onSelect}
            size="lg"
          >
            اختر الباقة
          </Button>
        </Card.Footer>
      </Card>

      <style jsx>{`
        .package-card-wrapper {
          position: relative;
          height: 100%;
        }

        .package-card-wrapper.featured {
          transform: scale(1.05);
        }

        .package-card {
          height: 100%;
          border-radius: 20px;
          overflow: visible;
        }

        .featured-card {
          border: 2px solid var(--primary);
          box-shadow: 0 20px 40px rgba(209, 178, 138, 0.3);
        }

        .featured-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--primary);
          color: var(--secondary);
          padding: 8px 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 0.9rem;
          z-index: 10;
          box-shadow: 0 5px 15px rgba(209, 178, 138, 0.4);
        }

        .package-header {
          background: linear-gradient(135deg, var(--secondary), var(--dark-bg));
          color: white;
          text-align: center;
          padding: 2rem 1.5rem;
          border: none;
          position: relative;
          overflow: hidden;
        }

        .package-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--primary);
        }

        .package-icon {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-size: 1.8rem;
          color: var(--primary);
        }

        .package-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .package-price {
          margin-top: 1rem;
        }

        .price {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary);
        }

        .package-body {
          padding: 2rem 1.5rem;
        }

        .package-description {
          color: var(--text-light);
          text-align: center;
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .package-features {
          margin-bottom: 1rem;
        }

        .feature-item {
          border: none;
          padding: 12px 0;
          display: flex;
          align-items: center;
          gap: 12px;
          background: transparent;
        }

        .feature-item i {
          font-size: 1.1rem;
        }

        .feature-item span {
          color: var(--text-dark);
          font-weight: 500;
        }

        .package-footer {
          background: transparent;
          border: none;
          padding: 1.5rem;
        }

        @media (max-width: 768px) {
          .package-card-wrapper.featured {
            transform: none;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PackageCard;