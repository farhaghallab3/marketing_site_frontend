// src/components/Home/HeroSection.jsx
import React from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Scroll to packages section
    const packagesSection = document.getElementById('packages-section');
    if (packagesSection) {
      packagesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewPortfolio = () => {
    navigate('/designers');
  };

  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center min-vh-70">
          <Col lg={6} className="text-center text-lg-start">
            <Badge bg="light" text="dark" className="mb-3 px-3 py-2 rounded-pill">
              🚀 Professional Marketing Solutions
            </Badge>
            
            <h1 className="display-4 fw-bold mb-4">
              Transform Your Brand With 
              <span className="text-warning"> Expert Design</span>
            </h1>
            
            <p className="lead mb-4 fs-5">
              We create stunning visual identities that captivate your audience and drive results. 
              From brand design to social media graphics, our team delivers excellence at every pixel.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
              <Button 
                variant="warning" 
                size="lg" 
                className="px-4 py-2 fw-semibold"
                onClick={handleGetStarted}
              >
                Get Started Today
              </Button>
              
              <Button 
                variant="outline-light" 
                size="lg" 
                className="px-4 py-2 fw-semibold"
                onClick={handleViewPortfolio}
              >
                View Our Portfolio
              </Button>
            </div>

            {/* Stats Section */}
            <Row className="mt-5 pt-4 text-center text-sm-start">
              <Col xs={4} className="border-end border-light">
                <div className="text-white">
                  <h3 className="fw-bold mb-1">500+</h3>
                  <small className="text-light opacity-75">Projects Completed</small>
                </div>
              </Col>
              <Col xs={4} className="border-end border-light">
                <div className="text-white">
                  <h3 className="fw-bold mb-1">98%</h3>
                  <small className="text-light opacity-75">Client Satisfaction</small>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-white">
                  <h3 className="fw-bold mb-1">24/7</h3>
                  <small className="text-light opacity-75">Support Available</small>
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={6} className="text-center mt-5 mt-lg-0">
            <div className="position-relative">
              {/* Hero Image/Illustration */}
              <div className="hero-visual bg-light rounded-4 p-4 shadow-lg mx-auto">
                <div className="d-flex justify-content-center align-items-center h-100">
                  <div className="text-center text-dark">
                    <div className="mb-3">
                      <i className="bi bi-palette-fill display-1 text-primary"></i>
                    </div>
                    <h5 className="fw-bold">Visual Design Showcase</h5>
                    <p className="text-muted mb-0">
                      See how we transform ideas into stunning visuals
                    </p>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="position-absolute top-0 start-0 mt-n3 ms-n3">
                  <div className="bg-success rounded-circle p-2 shadow">
                    <i className="bi bi-check-lg text-white"></i>
                  </div>
                </div>
                <div className="position-absolute top-0 end-0 mt-n3 me-n3">
                  <div className="bg-info rounded-circle p-2 shadow">
                    <i className="bi bi-lightning-fill text-white"></i>
                  </div>
                </div>
                <div className="position-absolute bottom-0 start-0 mb-n3 ms-n3">
                  <div className="bg-warning rounded-circle p-2 shadow">
                    <i className="bi bi-star-fill text-white"></i>
                  </div>
                </div>
              </div>

              {/* Background Decoration */}
              <div className="position-absolute top-50 start-0 translate-middle-y z-n1">
                <div className="bg-primary bg-opacity-10 rounded-circle" style={{width: '300px', height: '300px'}}></div>
              </div>
              <div className="position-absolute bottom-0 end-0 z-n1">
                <div className="bg-warning bg-opacity-10 rounded-circle" style={{width: '200px', height: '200px'}}></div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Trust Badges */}
        <Row className="mt-5 pt-5">
          <Col className="text-center">
            <p className="text-light opacity-75 mb-3">Trusted by leading companies</p>
            <div className="d-flex flex-wrap justify-content-center gap-4 opacity-50">
              <div className="trust-badge">
                <i className="bi bi-google fs-3 text-light"></i>
              </div>
              <div className="trust-badge">
                <i className="bi bi-meta fs-3 text-light"></i>
              </div>
              <div className="trust-badge">
                <i className="bi bi-microsoft fs-3 text-light"></i>
              </div>
              <div className="trust-badge">
                <i className="bi bi-amazon fs-3 text-light"></i>
              </div>
              <div className="trust-badge">
                <i className="bi bi-spotify fs-3 text-light"></i>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 100px 0 80px;
          position: relative;
          overflow: hidden;
        }

        .min-vh-70 {
          min-height: 70vh;
        }

        .hero-visual {
          max-width: 500px;
          height: 300px;
          position: relative;
          background: linear-gradient(145deg, #ffffff, #f8f9fa);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .trust-badge {
          transition: all 0.3s ease;
          padding: 10px;
        }

        .trust-badge:hover {
          transform: translateY(-2px);
          opacity: 1 !important;
        }

        .z-n1 {
          z-index: -1;
        }

        /* Animation for floating elements */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .position-absolute:nth-child(1) { animation: float 3s ease-in-out infinite; }
        .position-absolute:nth-child(2) { animation: float 3s ease-in-out infinite 1s; }
        .position-absolute:nth-child(3) { animation: float 3s ease-in-out infinite 2s; }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
            text-align: center;
          }
          
          .display-4 {
            font-size: 2.5rem;
          }
          
          .hero-visual {
            height: 250px;
            margin-top: 2rem;
          }

          .border-end {
            border-right: none !important;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;