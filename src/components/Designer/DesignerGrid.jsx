// src/components/Designer/DesignerGrid.jsx
import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Badge, Button } from 'react-bootstrap';
import DesignerCard from './DesignerCard';

const DesignerGrid = ({ designers, onDesignerSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  const specialties = ['all', ...new Set(designers.map(designer => designer.specialty))];

  const filteredAndSortedDesigners = designers
    .filter(designer => {
      const matchesSearch = designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          designer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSpecialty = selectedSpecialty === 'all' || designer.specialty === selectedSpecialty;
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setSortBy('rating');
  };

  return (
    <div className="designer-grid">
      <div className="filters-section mb-4 p-4 bg-light rounded-3">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">ابحث عن المصممين</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="ابحث بالاسم، التخصص، أو السيرة الذاتية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">التخصص</Form.Label>
              <Form.Select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'جميع التخصصات' : specialty}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">ترتيب حسب</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">الأعلى تقييماً</option>
                <option value="experience">الأكثر خبرة</option>
                <option value="name">حسب الأبجدية</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button 
              variant="outline-secondary" 
              onClick={handleClearFilters}
              className="w-100"
            >
              مسح الفلاتر
            </Button>
          </Col>
        </Row>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1">
            {filteredAndSortedDesigners.length} مصمم{filteredAndSortedDesigners.length !== 1 ? 'ين' : ''} متاح{filteredAndSortedDesigners.length !== 1 ? 'ون' : ''}
          </h5>
          <div className="text-muted small">
            {selectedSpecialty !== 'all' && (
              <Badge bg="primary" className="me-2">
                تخصص: {selectedSpecialty}
              </Badge>
            )}
            {searchTerm && (
              <Badge bg="info" className="me-2">
                بحث: "{searchTerm}"
              </Badge>
            )}
            <Badge bg="secondary">
              مرتب حسب: {sortBy === 'rating' ? 'التقييم' : sortBy === 'experience' ? 'الخبرة' : 'الاسم'}
            </Badge>
          </div>
        </div>

        {filteredAndSortedDesigners.length > 0 && (
          <div className="text-muted small">
            عرض {Math.min(filteredAndSortedDesigners.length, 9)} من {filteredAndSortedDesigners.length}
          </div>
        )}
      </div>

      {filteredAndSortedDesigners.length > 0 ? (
        <Row className="g-4">
          {filteredAndSortedDesigners.map((designer, index) => (
            <Col key={designer.id} xl={4} lg={6} md={6}>
              <DesignerCard 
                designer={designer}
                onSelect={onDesignerSelect}
                rank={index + 1}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-search display-1 text-muted"></i>
          </div>
          <h4 className="text-muted mb-3">لم يتم العثور على مصممين</h4>
          <p className="text-muted mb-4">
            لم نتمكن من العثور على مصممين يطابقون معاييرك. <br />
            حاول تعديل الفلاتر أو مصطلحات البحث.
          </p>
          <Button 
            variant="primary" 
            onClick={handleClearFilters}
            size="lg"
          >
            مسح كل الفلاتر
          </Button>
        </div>
      )}

      {filteredAndSortedDesigners.length > 9 && (
        <div className="text-center mt-5">
          <Button variant="outline-primary" size="lg">
            تحميل المزيد من المصممين
          </Button>
        </div>
      )}

      <style jsx>{`
        .designer-grid {
          padding: 20px 0;
        }

        .filters-section {
          background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
          border: 1px solid #dee2e6;
        }
      `}</style>
    </div>
  );
};

export default DesignerGrid;