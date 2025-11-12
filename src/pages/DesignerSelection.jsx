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
    document.title = 'اختيار المصمم - Vivora Agency';
  }, []);
  useEffect(() => {
    const mockDesigners = [
      {
        id: 1,
        name: "سارة أحمد",
        specialty: "هوية العلامة التجارية",
        experience: "٥ سنوات",
        bio: "متخصصة في إنشاء هويات علامات تجارية لا تنسى للشركات الناشئة التقنية.",
        portfolio: ["project1.jpg", "project2.jpg", "project3.jpg"],
        avatar: "/avatars/sarah.jpg",
        rating: 4.9
      },
      {
        id: 2,
        name: "محمد الخالد",
        specialty: "تصميم وسائل التواصل الاجتماعي",
        experience: "٣ سنوات",
        bio: "خبير في إنشاء محتوى وسائل تواصل اجتماعي جذاب يحقق التحويلات.",
        portfolio: ["project4.jpg", "project5.jpg", "project6.jpg"],
        avatar: "/avatars/mohammed.jpg",
        rating: 4.7
      },
      {
        id: 3,
        name: "فاطمة العلي",
        specialty: "تصميم الويب",
        experience: "٦ سنوات",
        bio: "شغوفة بإنشاء تجارب ويب تركز على المستخدم وتحقق التحويلات.",
        portfolio: ["project7.jpg", "project8.jpg", "project9.jpg"],
        avatar: "/avatars/fatima.jpg",
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
          <h2>اختر المصمم الخاص بك</h2>
          <p className="lead">اختر من بين فريقنا الموهوب من المصممين المحترفين</p>
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