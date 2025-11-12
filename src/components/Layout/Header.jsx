// src/components/Layout/Header.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الباقات', path: '/#packages' },
    { name: 'المصممين', path: '/designers' },
    { name: 'أعمالنا', path: '/portfolio' },
    { name: 'اتصل بنا', path: '/contact' }
  ];

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`modern-navbar ${scrolled ? 'scrolled' : ''}`}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-modern">
          <div className="brand-logo">
            <img 
              src="/logo.png" 
              alt="Vivora Agency" 
              className="logo-img"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="logo-fallback">
              <span className="logo-text">V</span>
            </div>
          </div>
          <span className="brand-name">
            Vivora <span className="text-primary">Agency</span>
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler-modern">
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            {navLinks.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.path}
                className={`nav-link-modern ${isActiveLink(link.path) ? 'active' : ''}`}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <Dropdown align="start">
                <Dropdown.Toggle className="user-toggle-modern">
                  <div className="user-avatar">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} />
                    ) : (
                      <span>{user?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <span>{user?.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-modern">
                  <Dropdown.Item as={Link} to="/dashboard">
                    لوحة التحكم
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile">
                    الملف الشخصي
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    تسجيل الخروج
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="auth-buttons">
                <Button 
                  className="btn-outline-modern me-2"
                  onClick={() => navigate('/login')}
                >
                  تسجيل الدخول
                </Button>
                <Button 
                  className="btn-primary-modern"
                  onClick={() => navigate('/login')}
                >
                  ابدأ الآن
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        .modern-navbar {
          background: transparent;
          padding: 1.5rem 0;
          transition: all 0.4s ease;
        }

        .modern-navbar.scrolled {
          background: rgba(46, 46, 46, 0.95);
          backdrop-filter: blur(20px);
          padding: 1rem 0;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .brand-modern {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .brand-logo {
          position: relative;
          margin-left: 12px;
        }

        .logo-img {
          width: 45px;
          height: 45px;
          border-radius: 12px;
          object-fit: cover;
        }

        .logo-fallback {
          width: 45px;
          height: 45px;
          background: var(--primary);
          border-radius: 12px;
          display: none;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-weight: 800;
          font-size: 1.2rem;
        }

        .brand-name {
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .navbar-toggler-modern {
          border: none;
          background: transparent;
          width: 30px;
          height: 30px;
          position: relative;
          padding: 0;
        }

        .navbar-toggler-modern span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--primary);
          margin: 6px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .nav-link-modern {
          color: rgba(255, 255, 255, 0.8) !important;
          font-weight: 600;
          padding: 0.5rem 1.5rem !important;
          margin: 0 0.25rem;
          border-radius: 12px;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link-modern:hover,
        .nav-link-modern.active {
          color: white !important;
          background: rgba(209, 178, 138, 0.1);
        }

        .nav-link-modern.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          right: 50%;
          transform: translateX(50%);
          width: 6px;
          height: 6px;
          background: var(--primary);
          border-radius: 50%;
        }

        .header-actions {
          display: flex;
          align-items: center;
        }

        .user-toggle-modern {
          background: transparent;
          border: 2px solid var(--primary);
          color: white;
          border-radius: 12px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .user-toggle-modern:hover {
          background: var(--primary);
          color: var(--secondary);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--secondary);
          font-weight: 700;
          overflow: hidden;
        }

        .user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .dropdown-modern {
          background: rgba(46, 46, 46, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 8px;
          margin-top: 8px;
        }

        .dropdown-modern .dropdown-item {
          color: white;
          padding: 10px 16px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .dropdown-modern .dropdown-item:hover {
          background: var(--primary);
          color: var(--secondary);
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
        }

        @media (max-width: 991.98px) {
          .modern-navbar {
            padding: 1rem 0;
          }

          .navbar-collapse {
            background: rgba(46, 46, 46, 0.98);
            backdrop-filter: blur(20px);
            border-radius: 20px;
            margin-top: 1rem;
            padding: 2rem;
          }

          .nav-link-modern {
            margin: 0.5rem 0;
            text-align: center;
          }

          .auth-buttons {
            justify-content: center;
            margin-top: 1rem;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default Header;