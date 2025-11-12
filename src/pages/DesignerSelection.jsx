// src/pages/DesignerSelection.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import DesignerGrid from '../components/Designer/DesignerGrid';

const DesignerSelection = () => {
  const [designers, setDesigners] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // In a real app, this would be an API call
    const mockDesigners = [
      {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Brand Identity",
        experience: "5 years",
        bio: "Specialized in creating memorable brand identities for tech startups.",
        portfolio: ["project1.jpg", "project2.jpg", "project3.jpg"],
        avatar: "/avatars/sarah.jpg",
        rating: 4.9
      },
      {
        id: 2,
        name: "Mike Chen",
        specialty: "Social Media Graphics",
        experience: "3 years",
        bio: "Expert in creating engaging social media content that drives conversions.",
        portfolio: ["project4.jpg", "project5.jpg", "project6.jpg"],
        avatar: "/avatars/mike.jpg",
        rating: 4.7
      },
      {
        id: 3,
        name: "Emma Davis",
        specialty: "Web Design",
        experience: "6 years",
        bio: "Passionate about creating user-centered web experiences that convert.",
        portfolio: ["project7.jpg", "project8.jpg", "project9.jpg"],
        avatar: "/avatars/emma.jpg",
        rating: 4.8
      }
    ];

    setDesigners(mockDesigners);
    setSelectedPackage(location.state?.selectedPackage || 1);
  }, [location]);

  const handleDesignerSelect = (designerId) => {
    navigate('/project-form', { 
      state: { 
        selectedPackage,
        selectedDesigner: designerId 
      } 
    });
  };

  return (
    <Container className="my-5">
      <Row className="text-center mb-5">
        <Col>
          <h2>Choose Your Designer</h2>
          <p className="lead">Select from our talented team of professional designers</p>
        </Col>
      </Row>
      <DesignerGrid 
        designers={designers} 
        onDesignerSelect={handleDesignerSelect}
      />
    </Container>
  );
};

export default DesignerSelection;