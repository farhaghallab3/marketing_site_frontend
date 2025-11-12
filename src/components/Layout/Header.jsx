// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Badge, Dropdown, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowOffcanvas(false);
    navigate('/');
  };

  const handleLogin = () => {
    navigate('/login');
    setShowOffcanvas(false);
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setShowOffcanvas(false);
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: 'bi-house' },
    { name: 'Packages', path: '/#packages-section', icon: 'bi-box' },
    { name: 'Designers', path: '/designers', icon: 'bi-people' },
    { name: 'Portfolio', path: '/portfolio', icon: 'bi-images' },
    { name: 'About', path: '/about', icon: 'bi-info-circle' },
    { name: 'Contact', path: '/contact', icon: 'bi-telephone' }
  ];

  const isActiveLink = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <Navbar 
        expand="lg" 
        fixed="top" 
        className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
        variant="dark"
      >
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <div className="brand-logo me-2">
              <i className="bi bi-palette2 text-warning"></i>
            </div>
            <span className="brand-text fw-bold">
              Design<span className="text-warning">Pro</span>
            </span>
          </Navbar.Brand>

          {/* Desktop Navigation */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {navLinks.map((link, index) => (
                <Nav.Link
                  key={index}
                  as={Link}
                  to={link.path}
                  className={`nav-link-custom mx-2 ${
                    isActiveLink(link.path) ? 'active' : ''
                  }`}
                >
                  <i className={`${link.icon} me-1 d-lg-none`}></i>
                  {link.name}
                </Nav.Link>
              ))}
            </Nav>

            {/* Right Side Actions - Desktop */}
            <div className="d-flex align-items-center gap-3">
              {/* WhatsApp Quick Action */}
              <Button
                variant="outline-light"
                size="sm"
                className="d-none d-md-flex align-items-center gap-2"
                as="a"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-whatsapp"></i>
                <span>Quick Help</span>
              </Button>

              {/* User Actions */}
              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle 
                    variant="outline-warning" 
                    className="d-flex align-items-center gap-2"
                  >
                    <div className="user-avatar-sm">
                      {user?.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="rounded-circle"
                        />
                      ) : (
                        <i className="bi bi-person-circle"></i>
                      )}
                    </div>
                    <span className="d-none d-md-inline">{user?.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="dropdown-menu-custom">
                    <Dropdown.Header>
                      <div className="d-flex align-items-center">
                        <div className="user-avatar me-3">
                          {user?.avatar ? (
                            <img 
                              src={user.avatar} 
                              alt={user.name} 
                              className="rounded-circle"
                              width="40"
                              height="40"
                            />
                          ) : (
                            <i className="bi bi-person-circle fs-3"></i>
                          )}
                        </div>
                        <div>
                          <div className="fw-bold">{user?.name}</div>
                          <small className="text-muted">{user?.email}</small>
                        </div>
                      </div>
                    </Dropdown.Header>
                    
                    <Dropdown.Divider />
                    
                    <Dropdown.Item onClick={handleDashboard}>
                      <i className="bi bi-speedometer2 me-2"></i>
                      Dashboard
                    </Dropdown.Item>
                    
                    <Dropdown.Item as={Link} to="/profile">
                      <i className="bi bi-person me-2"></i>
                      My Profile
                    </Dropdown.Item>
                    
                    <Dropdown.Item as={Link} to="/orders">
                      <i className="bi bi-bag me-2"></i>
                      My Orders
                      <Badge bg="primary" className="ms-2">
                        {user?.orderCount || 0}
                      </Badge>
                    </Dropdown.Item>
                    
                    <Dropdown.Divider />
                    
                    <Dropdown.Item onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2 text-danger"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-light"
                    size="sm"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Button
                    variant="warning"
                    size="sm"
                    className="fw-semibold"
                    as={Link}
                    to="/login"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </Navbar.Collapse>

          {/* Mobile Menu Toggle */}
          <Button
            variant="outline-warning"
            className="navbar-toggler-custom d-lg-none"
            onClick={() => setShowOffcanvas(true)}
          >
            <i className="bi bi-list"></i>
          </Button>
        </Container>
      </Navbar>

      {/* Spacer for fixed navbar */}
      <div className="navbar-spacer"></div>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="end"
        className="offcanvas-custom"
      >
        <Offcanvas.Header closeButton className="border-bottom">
          <Offcanvas.Title className="d-flex align-items-center">
            <div className="brand-logo me-2">
              <i className="bi bi-palette2 text-warning"></i>
            </div>
            <span className="brand-text fw-bold">
              Design<span className="text-warning">Pro</span>
            </span>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* User Info Section */}
          {isAuthenticated && (
            <div className="user-info-mobile mb-4 p-3 bg-light rounded">
              <div className="d-flex align-items-center">
                <div className="user-avatar me-3">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                  ) : (
                    <i className="bi bi-person-circle fs-1"></i>
                  )}
                </div>
                <div>
                  <div className="fw-bold">{user?.name}</div>
                  <small className="text-muted">{user?.email}</small>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          <Nav className="flex-column gap-2">
            {navLinks.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.path}
                className={`nav-link-mobile ${
                  isActiveLink(link.path) ? 'active' : ''
                }`}
                onClick={() => setShowOffcanvas(false)}
              >
                <i className={`${link.icon} me-3`}></i>
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* Mobile Actions */}
          <div className="mt-4 pt-3 border-top">
            {isAuthenticated ? (
              <div className="d-grid gap-2">
                <Button
                  variant="warning"
                  onClick={handleDashboard}
                  className="fw-semibold"
                >
                  <i className="bi bi-speedometer2 me-2"></i>
                  Dashboard
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  onClick={handleLogin}
                >
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Button>
                <Button
                  variant="warning"
                  onClick={handleLogin}
                  className="fw-semibold"
                >
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Get Started
                </Button>
              </div>
            )}

            {/* WhatsApp Mobile Button */}
            <div className="d-grid mt-3">
              <Button
                variant="success"
                as="a"
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-whatsapp"></i>
                Chat on WhatsApp
              </Button>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <style jsx>{`
        .custom-navbar {
          background: transparent;
          transition: all 0.3s ease;
          padding: 1rem 0;
        }

        .custom-navbar.scrolled {
          background: rgba(33, 37, 41, 0.95);
          backdrop-filter: blur(10px);
          padding: 0.5rem 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .navbar-spacer {
          height: 80px;
        }

        .brand-logo {
          font-size: 1.8rem;
        }

        .brand-text {
          font-size: 1.5rem;
          color: white;
        }

        .nav-link-custom {
          color: rgba(255, 255, 255, 0.85) !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          border-radius: 0.375rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link-custom:hover {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link-custom.active {
          color: var(--bs-warning) !important;
        }

        .nav-link-custom.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 1rem;
          right: 1rem;
          height: 2px;
          background: var(--bs-warning);
          border-radius: 2px;
        }

        .navbar-toggler-custom {
          border: 1px solid var(--bs-warning);
          color: var(--bs-warning);
          padding: 0.375rem 0.75rem;
        }

        .navbar-toggler-custom:hover {
          background: var(--bs-warning);
          color: black;
        }

        .user-avatar-sm {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
        }

        .user-avatar-sm img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dropdown-menu-custom {
          border: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
          margin-top: 0.5rem;
        }

        .dropdown-menu-custom .dropdown-item {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          transition: all 0.2s ease;
        }

        .dropdown-menu-custom .dropdown-item:hover {
          background: var(--bs-warning);
          color: black;
        }

        .offcanvas-custom {
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          color: white;
        }

        .nav-link-mobile {
          color: rgba(255, 255, 255, 0.85) !important;
          padding: 0.75rem 1rem !important;
          border-radius: 0.375rem;
          margin-bottom: 0.25rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }

        .nav-link-mobile:hover,
        .nav-link-mobile.active {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-link-mobile.active {
          color: var(--bs-warning) !important;
        }

        .user-info-mobile {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .navbar-spacer {
            height: 70px;
          }

          .brand-text {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 767.98px) {
          .custom-navbar {
            padding: 0.75rem 0;
          }

          .navbar-spacer {
            height: 65px;
          }
        }

        /* Animation for navbar appearance */
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }

        .custom-navbar {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default Header;