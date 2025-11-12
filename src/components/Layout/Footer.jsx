// src/components/Layout/Footer.jsx
import React from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    const formData = new FormData(e.target);
    const email = formData.get('newsletter-email');
    console.log('Newsletter subscription:', email);
    // Add your newsletter API call here
    e.target.reset();
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Our Packages', path: '/#packages-section' },
    { name: 'Designers', path: '/designers' },
    { name: 'Portfolio', path: '/designers' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const services = [
    'Brand Identity Design',
    'Social Media Graphics',
    'Website Design',
    'Marketing Materials',
    'Logo Design',
    'Print Design'
  ];

  const company = [
    'About Company',
    'Our Team',
    'Careers',
    'Privacy Policy',
    'Terms of Service',
    'FAQ'
  ];

  return (
    <footer className="footer bg-dark text-light">
      {/* Main Footer Content */}
      <Container className="py-5">
        <Row className="g-4">
          {/* Company Info */}
          <Col lg={4} md={6}>
            <div className="footer-brand mb-4">
              <h4 className="fw-bold text-warning mb-3">
                <i className="bi bi-palette2 me-2"></i>
                DesignPro
              </h4>
              <p className="text-light opacity-75 mb-4">
                We create stunning visual identities that help businesses stand out. 
                Our team of professional designers delivers exceptional results 
                that drive growth and engagement.
              </p>
              
              {/* Social Links */}
              <div className="social-links mb-4">
                <h6 className="text-white mb-3">Follow Us</h6>
                <div className="d-flex gap-3">
                  {[
                    { icon: 'bi-facebook', name: 'Facebook', url: '#' },
                    { icon: 'bi-instagram', name: 'Instagram', url: '#' },
                    { icon: 'bi-twitter', name: 'Twitter', url: '#' },
                    { icon: 'bi-linkedin', name: 'LinkedIn', url: '#' },
                    { icon: 'bi-behance', name: 'Behance', url: '#' }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="social-link"
                      aria-label={social.name}
                    >
                      <i className={`bi ${social.icon}`}></i>
                    </a>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="contact-info">
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-telephone-fill text-warning me-3"></i>
                  <span className="text-light opacity-75">+1 (555) 123-4567</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <i className="bi bi-envelope-fill text-warning me-3"></i>
                  <span className="text-light opacity-75">hello@designpro.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt-fill text-warning me-3"></i>
                  <span className="text-light opacity-75">123 Design St, Creative City</span>
                </div>
              </div>
            </div>
          </Col>

          {/* Quick Links */}
          <Col lg={2} md={6}>
            <h6 className="text-white mb-4 fw-semibold">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              {quickLinks.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link 
                    to={link.path} 
                    className="footer-link text-light opacity-75 text-decoration-none"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Services */}
          <Col lg={2} md={6}>
            <h6 className="text-white mb-4 fw-semibold">Our Services</h6>
            <ul className="list-unstyled footer-links">
              {services.map((service, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="footer-link text-light opacity-75 text-decoration-none">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Company */}
          <Col lg={2} md={6}>
            <h6 className="text-white mb-4 fw-semibold">Company</h6>
            <ul className="list-unstyled footer-links">
              {company.map((item, index) => (
                <li key={index} className="mb-2">
                  <a href="#" className="footer-link text-light opacity-75 text-decoration-none">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Newsletter */}
          <Col lg={2} md={6}>
            <h6 className="text-white mb-4 fw-semibold">Newsletter</h6>
            <p className="text-light opacity-75 small mb-3">
              Subscribe to get updates on new designs and offers.
            </p>
            <Form onSubmit={handleNewsletterSubmit}>
              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  name="newsletter-email"
                  placeholder="Your email"
                  className="bg-light border-0"
                  required
                />
                <Button 
                  variant="warning" 
                  type="submit"
                  className="border-0"
                >
                  <i className="bi bi-send-fill"></i>
                </Button>
              </InputGroup>
            </Form>
            
            {/* WhatsApp Business */}
            <div className="whatsapp-business mt-4">
              <h6 className="text-white mb-3 fw-semibold">Business WhatsApp</h6>
              <Button 
                variant="success" 
                size="sm" 
                className="rounded-pill d-flex align-items-center gap-2"
                as="a"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
                Chat with Us
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Bottom Footer */}
      <div className="footer-bottom border-top border-secondary">
        <Container className="py-4">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="mb-0 text-light opacity-75">
                &copy; {currentYear} DesignPro. All rights reserved.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="payment-methods mb-2">
                <span className="text-light opacity-75 me-2">We accept:</span>
                {[
                  'bi-credit-card',
                  'bi-paypal',
                  'bi-currency-bitcoin',
                  'bi-bank'
                ].map((icon, index) => (
                  <i key={index} className={`bi ${icon} text-light opacity-75 me-2`}></i>
                ))}
              </div>
              <div className="security-badges">
                {[
                  { text: 'SSL Secure', icon: 'bi-shield-check' },
                  { text: 'GDPR', icon: 'bi-file-earmark-lock' },
                  { text: 'Privacy', icon: 'bi-eye-slash' }
                ].map((badge, index) => (
                  <small key={index} className="text-light opacity-75 me-3">
                    <i className={`bi ${badge.icon} me-1`}></i>
                    {badge.text}
                  </small>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="floating-whatsapp">
        <Button
          variant="success"
          size="lg"
          className="rounded-circle shadow-lg"
          as="a"
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          title="Chat on WhatsApp"
        >
          <i className="bi bi-whatsapp fs-5"></i>
        </Button>
      </div>

      <style jsx>{`
        .footer {
          margin-top: auto;
          position: relative;
        }

        .footer-brand h4 {
          font-size: 1.5rem;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--bs-warning);
          color: #000;
          transform: translateY(-2px);
        }

        .footer-link {
          transition: all 0.3s ease;
          position: relative;
        }

        .footer-link:hover {
          color: var(--bs-warning) !important;
          padding-left: 8px;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: var(--bs-warning);
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .footer-link:hover::before {
          opacity: 1;
          left: 0;
        }

        .contact-info i {
          width: 16px;
          text-align: center;
        }

        .floating-whatsapp {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
          animation: float 3s ease-in-out infinite;
        }

        .floating-whatsapp .btn {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .footer-bottom {
          background: rgba(0, 0, 0, 0.3);
        }

        .payment-methods i,
        .security-badges i {
          font-size: 1.1rem;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .footer {
            text-align: center;
          }

          .social-links .d-flex {
            justify-content: center;
          }

          .contact-info .d-flex {
            justify-content: center;
          }

          .floating-whatsapp {
            bottom: 20px;
            right: 20px;
          }

          .floating-whatsapp .btn {
            width: 50px;
            height: 50px;
          }

          .footer-brand h4 {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 576px) {
          .footer-links li {
            margin-bottom: 0.5rem;
          }

          .security-badges small {
            display: block;
            margin-bottom: 0.5rem;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .footer {
            background: #1a1a1a !important;
          }
        }

        /* Print styles */
        @media print {
          .footer {
            display: none;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;