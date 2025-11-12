// src/components/Layout/Footer.jsx
import React from 'react';
import { Container, Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('newsletter-email');
    console.log('Newsletter subscription:', email);
    e.target.reset();
  };

  const quickLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'باقاتنا', path: '/#packages' },
    { name: 'المصممين', path: '/designers' },
    { name: 'أعمالنا', path: '/portfolio' },
    { name: 'من نحن', path: '/about' },
    { name: 'اتصل بنا', path: '/contact' }
  ];

  const services = [
    'تصميم الهوية البصرية',
    'تصميم الشعارات',
    'مواقع إلكترونية',
    'تطبيقات الجوال',
    'وسائل التواصل الاجتماعي',
    'التصميم المطبوع'
  ];

  return (
    <footer className="footer-modern">
      {/* Main Footer */}
      <div className="footer-main">
        <Container>
          <Row className="g-4">
            {/* Brand Column */}
            <Col lg={4} md={6}>
              <div className="footer-brand">
                <div className="brand-section">
                  <div className="footer-logo">
                    <img 
                      src="/logo.png" 
                      alt="Vivora Agency" 
                      className="logo-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="logo-fallback">
                      <span>V</span>
                    </div>
                  </div>
                  <h3 className="brand-name">
                    Vivora <span className="text-primary">Agency</span>
                  </h3>
                  <p className="brand-tagline">
                    نخلق تجارب بصرية استثنائية تحول أفكارك إلى واقع ملموس
                  </p>
                </div>

                <div className="contact-info">
                  <div className="contact-item">
                    <i className="bi bi-telephone-fill"></i>
                    <span>+٩٦٦ ٥٥ ١٢٣ ٤٥٦٧</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>hello@vivora.com</span>
                  </div>
                  <div className="contact-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>الرياض، المملكة العربية السعودية</span>
                  </div>
                </div>

                <div className="social-links">
                  <h5>تابعنا</h5>
                  <div className="social-icons">
                    {[
                      { icon: 'bi-twitter', name: 'تويتر', url: '#' },
                      { icon: 'bi-instagram', name: 'انستغرام', url: '#' },
                      { icon: 'bi-linkedin', name: 'لينكدإن', url: '#' },
                      { icon: 'bi-behance', name: 'بيهانس', url: '#' }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="social-icon"
                        aria-label={social.name}
                      >
                        <i className={`bi ${social.icon}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6}>
              <div className="footer-links">
                <h5>روابط سريعة</h5>
                <ul>
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path} className="footer-link">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            {/* Services */}
            <Col lg={2} md={6}>
              <div className="footer-links">
                <h5>خدماتنا</h5>
                <ul>
                  {services.map((service, index) => (
                    <li key={index}>
                      <a href="#" className="footer-link">
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>

            {/* Newsletter */}
            <Col lg={4} md={6}>
              <div className="newsletter-section">
                <h5>النشرة البريدية</h5>
                <p className="newsletter-desc">
                  اشترك لتصلك آخر التصاميم والعروض الحصرية
                </p>
                <Form onSubmit={handleNewsletterSubmit} className="newsletter-form">
                  <InputGroup>
                    <Form.Control
                      type="email"
                      name="newsletter-email"
                      placeholder="بريدك الإلكتروني"
                      className="newsletter-input"
                      required
                    />
                    <Button type="submit" className="newsletter-btn">
                      <i className="bi bi-send-fill"></i>
                    </Button>
                  </InputGroup>
                </Form>

                <div className="whatsapp-section">
                  <Button 
                    className="whatsapp-btn btn-primary-modern w-100"
                    as="a"
                    href="https://wa.me/966551234567"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-whatsapp"></i>
                    تواصل عبر واتساب
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-end">
              <p className="copyright">
                &copy; {currentYear} Vivora Agency. جميع الحقوق محفوظة.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-start">
              <div className="footer-meta">
                <a href="/privacy" className="meta-link">سياسة الخصوصية</a>
                <a href="/terms" className="meta-link">شروط الخدمة</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Floating WhatsApp */}
      <div className="floating-whatsapp animate-float">
        <Button
          className="whatsapp-float btn-primary-modern"
          as="a"
          href="https://wa.me/966551234567"
          target="_blank"
          rel="noopener noreferrer"
          title="محادثة واتساب"
        >
          <i className="bi bi-whatsapp"></i>
        </Button>
      </div>

      <style jsx>{`
        .footer-modern {
          background: linear-gradient(135deg, var(--secondary), var(--dark-bg));
          color: white;
          position: relative;
          overflow: hidden;
        }

        .footer-main {
          padding: 80px 0 40px;
          position: relative;
        }

        .footer-main::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary), transparent);
        }

        .footer-brand {
          height: 100%;
        }

        .brand-section {
          margin-bottom: 2rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .logo-img {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          object-fit: cover;
          margin-left: 12px;
        }

        .logo-fallback {
          width: 50px;
          height: 50px;
          background: var(--primary);
          border-radius: 12px;
          display: none;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-weight: 800;
          font-size: 1.3rem;
          margin-left: 12px;
        }

        .brand-name {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .brand-tagline {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 0;
        }

        .contact-info {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .contact-item i {
          color: var(--primary);
          margin-left: 12px;
          font-size: 1.1rem;
          width: 20px;
        }

        .social-links h5 {
          margin-bottom: 1rem;
          color: white;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-icon:hover {
          background: var(--primary);
          color: var(--secondary);
          transform: translateY(-2px);
        }

        .footer-links h5 {
          margin-bottom: 1.5rem;
          color: white;
          font-weight: 600;
        }

        .footer-links ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.8rem;
        }

        .footer-link {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding-right: 15px;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary);
          padding-right: 20px;
        }

        .footer-link:hover::before {
          opacity: 1;
        }

        .newsletter-section {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          height: 100%;
        }

        .newsletter-section h5 {
          margin-bottom: 1rem;
          color: white;
        }

        .newsletter-desc {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }

        .newsletter-form {
          margin-bottom: 1.5rem;
        }

        .newsletter-input {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          border-radius: 12px;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 0 0 0.2rem rgba(209, 178, 138, 0.25);
        }

        .newsletter-btn {
          background: var(--primary);
          border: none;
          border-radius: 12px;
          color: var(--secondary);
          padding: 0 20px;
          transition: all 0.3s ease;
        }

        .newsletter-btn:hover {
          background: #c0a078;
          transform: scale(1.05);
        }

        .whatsapp-section {
          margin-top: 1.5rem;
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
          padding: 1.5rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .footer-meta {
          display: flex;
          gap: 2rem;
          justify-content: center;
        }

        .meta-link {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .meta-link:hover {
          color: var(--primary);
        }

        .floating-whatsapp {
          position: fixed;
          bottom: 30px;
          left: 30px;
          z-index: 1000;
        }

        .whatsapp-float {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          box-shadow: 0 10px 30px rgba(209, 178, 138, 0.4);
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 60px 0 30px;
          }

          .newsletter-section {
            padding: 1.5rem;
          }

          .footer-meta {
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
          }

          .floating-whatsapp {
            bottom: 20px;
            left: 20px;
          }

          .whatsapp-float {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;