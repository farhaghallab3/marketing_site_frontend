// src/components/Home/HeroSection.jsx
import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);

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

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-modern gradient-bg" ref={heroRef}>
      <div className="hero-background">
        <div className="floating-shapes">
          <div className="shape shape-1 animate-float"></div>
          <div className="shape shape-2 animate-float" style={{animationDelay: '1s'}}></div>
          <div className="shape shape-3 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="shape shape-4 animate-float" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
      
      <Container>
        <Row className="align-items-center min-vh-100">
          <Col lg={6} className="hero-content">
            <div className="hero-badge animate-fade-in-up">
              <span>🚀 وكالة فيفورا للتصميم</span>
            </div>
            
            <h1 className="hero-title animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              إبداع بلا حدود 
              <span className="text-primary"> لعلامتك التجارية</span>
            </h1>
            
            <p className="hero-description animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              نصنع تجارب بصرية استثنائية تحول أفكارك إلى واقع ملموس. 
              من التصميم الجرافيكي إلى الهويات البصرية المتكاملة، 
              نقدم حلولاً إبداعية تلهم جمهورك وتحقق أهدافك.
            </p>

            <div className="hero-actions animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <Button 
                className="btn-primary-modern me-3 animate-pulse-slow"
                onClick={() => navigate('/designers')}
                size="lg"
              >
                ابدأ مشروعك
              </Button>
              <Button 
                className="btn-outline-modern"
                onClick={() => document.getElementById('packages').scrollIntoView({ behavior: 'smooth' })}
                size="lg"
              >
                استكشف الباقات
              </Button>
            </div>

            <div className="hero-stats animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="stat-item">
                <h3>٥٠٠+</h3>
                <span>مشروع مكتمل</span>
              </div>
              <div className="stat-item">
                <h3>٩٨٪</h3>
                <span>رضا العملاء</span>
              </div>
              <div className="stat-item">
                <h3>٤٨</h3>
                <span>ساعة تسليم</span>
              </div>
            </div>
          </Col>

          <Col lg={6} className="hero-visual">
            <div className="visual-container animate-fade-in-up" style={{animationDelay: '1s'}}>
              <div className="main-visual">
                <img 
                  src="/logo.png" 
                  alt="Vivora Agency" 
                  className="agency-logo"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="logo-placeholder">
                  <span>Vivora</span>
                </div>
              </div>
              
              <div className="floating-card card-1 animate-float">
                <i className="bi bi-palette"></i>
                <span>تصميم إبداعي</span>
              </div>
              
              <div className="floating-card card-2 animate-float" style={{animationDelay: '1s'}}>
                <i className="bi bi-lightning"></i>
                <span>تسليم سريع</span>
              </div>
              
              <div className="floating-card card-3 animate-float" style={{animationDelay: '2s'}}>
                <i className="bi bi-star"></i>
                <span>جودة عالية</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        .hero-modern {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: -1;
        }

        .floating-shapes .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(209, 178, 138, 0.1);
        }

        .shape-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          right: 10%;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 5%;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          top: 50%;
          right: 20%;
        }

        .shape-4 {
          width: 80px;
          height: 80px;
          bottom: 10%;
          right: 30%;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-badge {
          display: inline-block;
          background: rgba(209, 178, 138, 0.1);
          border: 1px solid rgba(209, 178, 138, 0.3);
          color: var(--primary);
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 600;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, white, var(--primary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-description {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 2.5rem;
          line-height: 1.8;
        }

        .hero-actions {
          margin-bottom: 3rem;
        }

        .hero-stats {
          display: flex;
          gap: 3rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-item h3 {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        .stat-item span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .hero-visual {
          position: relative;
          z-index: 2;
        }

        .visual-container {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-visual {
          width: 300px;
          height: 300px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .agency-logo {
          width: 150px;
          height: 150px;
          border-radius: 20px;
          object-fit: cover;
        }

        .logo-placeholder {
          width: 150px;
          height: 150px;
          background: var(--primary);
          border-radius: 20px;
          display: none;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-size: 2rem;
          font-weight: 800;
        }

        .floating-card {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 15px;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .floating-card i {
          color: var(--primary);
          font-size: 1.2rem;
        }

        .card-1 {
          top: 50px;
          right: 50px;
        }

        .card-2 {
          bottom: 80px;
          left: 30px;
        }

        .card-3 {
          top: 150px;
          left: 80px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-stats {
            gap: 1.5rem;
          }

          .stat-item h3 {
            font-size: 2rem;
          }

          .visual-container {
            height: 400px;
          }

          .main-visual {
            width: 250px;
            height: 250px;
          }

          .floating-card {
            padding: 10px 15px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;