import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import brainIcon from '../assets/images/brain-icon.png';
import mindlessLogo from '../assets/images/mindless-logo-full.png';

export default function Feed() {
  return (
    <div className="min-vh-100 d-flex flex-column bg-primary" style={{ backgroundColor: '#6C88D8' }}>
      <Container className="py-4">
        
        {/* Header */}
        <h1 className="text-purple text-decoration-underline fw-normal" style={{ fontSize: '4rem', color: '#FFFFFF' }}>
          Welcome to the Mindless Lounge
        </h1>

        <Row className="mt-4">
          {/* Left Section (Main Content) */}
          <Col md={9}>
            {/* First Post Box */}
            <Card className="border border-dark mb-4">
              <CardBody>
                <div className="fw-bold">User ID</div>
                <div className="mt-2">Post</div>
              </CardBody>
            </Card>

            {/* News/Weather Section */}
            <Card className="border border-dark mb-4">
              <CardBody className="text-center fw-bold">News/ Weather</CardBody>
            </Card>

            {/* Second Post Box */}
            <Card className="border border-dark mb-4">
              <CardBody>
                <div className="fw-bold">User ID</div>
                <div className="mt-2">Post</div>
              </CardBody>
            </Card>

            {/* Post Button & Brain Icon */}
            <div className="d-flex align-items-center justify-content-center">
              <Button color="light" outline className="border border-danger px-4 me-2">
                POST
              </Button>
              <img src={brainIcon} alt="Brain Icon" style={{ width: '50px', height: '50px' }} />
            </div>
          </Col>

          {/* Right Sidebar */}
          <Col md={3} className="text-center">
            {/* Logo */}
            <div className="mb-4">
              
            </div>

            {/* Sidebar Links */}
            <div className="d-flex flex-column align-items-center text-dark">
              <div className="fs-5"></div>
              <div className="fs-5 mt-3"></div>
              <div className="fs-5 mt-3"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
