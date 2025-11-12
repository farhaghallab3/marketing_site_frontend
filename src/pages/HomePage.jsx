// src/pages/HomePage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/Home/HeroSection';
import PackageCard from '../components/Home/PackageCard';

const HomePage = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Starter Package",
      price: "$299",
      features: [
        "2 Design Concepts",
        "3 Revisions",
        "Basic Social Media Kit",
        "5 Business Days Delivery"
      ],
      description: "Perfect for small businesses starting out"
    },
    {
      id: 2,
      name: "Professional Package",
      price: "$599",
      features: [
        "4 Design Concepts",
        "Unlimited Revisions",
        "Complete Brand Kit",
        "Social Media Templates",
        "10 Business Days Delivery"
      ],
      description: "Ideal for growing businesses"
    },
    {
      id: 3,
      name: "Enterprise Package",
      price: "$999",
      features: [
        "6 Design Concepts",
        "Unlimited Revisions",
        "Full Brand Identity",
        "Website Design Mockups",
        "Priority Support",
        "15 Business Days Delivery"
      ],
      description: "For established businesses needing comprehensive solutions"
    }
  ];

  const handlePackageSelect = (packageId) => {
    navigate('/designers', { state: { selectedPackage: packageId } });
  };

  return (
    <div>
      <HeroSection />
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2>Our Marketing Packages</h2>
            <p className="lead">Choose the perfect package for your business needs</p>
          </Col>
        </Row>
        <Row>
          {packages.map((pkg) => (
            <Col key={pkg.id} md={4} className="mb-4">
              <PackageCard 
                package={pkg} 
                onSelect={() => handlePackageSelect(pkg.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;