// src/components/Home/PackageCard.jsx
import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';

const PackageCard = ({ package: pkg, onSelect }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="text-center bg-primary text-white">
        <h4>{pkg.name}</h4>
        <h3 className="my-2">{pkg.price}</h3>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="text-muted mb-3">
          {pkg.description}
        </Card.Text>
        <ListGroup variant="flush" className="mb-3">
          {pkg.features.map((feature, index) => (
            <ListGroup.Item key={index} className="border-0 px-0">
              <i className="bi bi-check-circle-fill text-success me-2"></i>
              {feature}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Button 
          variant="primary" 
          className="mt-auto"
          onClick={onSelect}
        >
          Select Package
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PackageCard;