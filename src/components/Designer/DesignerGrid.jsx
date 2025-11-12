// src/components/Designer/DesignerGrid.jsx
import React, { useState } from 'react';
import { Row, Col, Form, InputGroup, Badge, Button } from 'react-bootstrap';
import DesignerCard from './DesignerCard';

const DesignerGrid = ({ designers, onDesignerSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Get unique specialties for filter
  const specialties = ['all', ...new Set(designers.map(designer => designer.specialty))];

  // Filter and sort designers
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
      {/* Filters and Search */}
      <div className="filters-section mb-4 p-4 bg-light rounded-3">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Group>
              <Form.Label className="fw-semibold">Search Designers</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, specialty, or bio..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">Specialty</Form.Label>
              <Form.Select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group>
              <Form.Label className="fw-semibold">Sort By</Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Alphabetical</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2}>
            <Button 
              variant="outline-secondary" 
              onClick={handleClearFilters}
              className="w-100"
            >
              Clear Filters
            </Button>
          </Col>
        </Row>
      </div>

      {/* Results Summary */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="mb-1">
            {filteredAndSortedDesigners.length} Designer{filteredAndSortedDesigners.length !== 1 ? 's' : ''} Available
          </h5>
          <div className="text-muted small">
            {selectedSpecialty !== 'all' && (
              <Badge bg="primary" className="me-2">
                Specialty: {selectedSpecialty}
              </Badge>
            )}
            {searchTerm && (
              <Badge bg="info" className="me-2">
                Search: "{searchTerm}"
              </Badge>
            )}
            <Badge bg="secondary">
              Sorted by: {sortBy === 'rating' ? 'Rating' : sortBy === 'experience' ? 'Experience' : 'Name'}
            </Badge>
          </div>
        </div>

        {filteredAndSortedDesigners.length > 0 && (
          <div className="text-muted small">
            Showing {Math.min(filteredAndSortedDesigners.length, 9)} of {filteredAndSortedDesigners.length}
          </div>
        )}
      </div>

      {/* Designers Grid */}
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
        /* No Results State */
        <div className="text-center py-5">
          <div className="mb-4">
            <i className="bi bi-search display-1 text-muted"></i>
          </div>
          <h4 className="text-muted mb-3">No Designers Found</h4>
          <p className="text-muted mb-4">
            We couldn't find any designers matching your criteria. <br />
            Try adjusting your filters or search terms.
          </p>
          <Button 
            variant="primary" 
            onClick={handleClearFilters}
            size="lg"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More Button (for pagination in future) */}
      {filteredAndSortedDesigners.length > 9 && (
        <div className="text-center mt-5">
          <Button variant="outline-primary" size="lg">
            Load More Designers
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

        .designer-card {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .designer-card:hover {
          transform: translateY(-5px);
          border-color: #007bff;
          box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
        }

        .rank-badge {
          position: absolute;
          top: -10px;
          left: -10px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.1rem;
          z-index: 2;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .rank-1 {
          background: linear-gradient(135deg, #FFD700, #FFA500);
          color: #000;
        }

        .rank-2 {
          background: linear-gradient(135deg, #C0C0C0, #A0A0A0);
          color: #000;
        }

        .rank-3 {
          background: linear-gradient(135deg, #CD7F32, #A66A2A);
          color: #fff;
        }

        .rank-other {
          background: linear-gradient(135deg, #6c757d, #495057);
          color: #fff;
        }

        .specialty-tag {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
        }

        .rating-stars {
          color: #ffc107;
        }

        .portfolio-preview {
          height: 120px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          margin: 10px 0;
          position: relative;
          overflow: hidden;
        }

        .portfolio-preview::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.3);
        }

        .portfolio-count {
          position: relative;
          z-index: 1;
        }

        /* Animation for card appearance */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .designer-card {
          animation: fadeInUp 0.5s ease-out;
        }

        .designer-card:nth-child(1) { animation-delay: 0.1s; }
        .designer-card:nth-child(2) { animation-delay: 0.2s; }
        .designer-card:nth-child(3) { animation-delay: 0.3s; }
        .designer-card:nth-child(4) { animation-delay: 0.4s; }
        .designer-card:nth-child(5) { animation-delay: 0.5s; }
        .designer-card:nth-child(6) { animation-delay: 0.6s; }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .filters-section .row {
            margin-bottom: 0;
          }
          
          .filters-section .col-md-2 {
            margin-top: 1rem;
          }

          .portfolio-preview {
            height: 100px;
          }
        }
      `}</style>
    </div>
  );
};

export default DesignerGrid;