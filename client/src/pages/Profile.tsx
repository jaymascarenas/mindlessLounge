import { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useParams, useNavigate } from "react-router-dom";
import { UserData, Post } from "../interfaces/UserData";
import profilePicture1 from "../assets/images/profilePicture1.jpeg";

export default function Profile() {
  return (
    <div
      style={{
        backgroundColor: "#AE55B4",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        borderRadius: "10px",
        boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
        padding: "20px",
        color: "white",
      }}
    >
      <Container className="my-5">
        <Row>
          <Col md={4}>
            <img
              src={profilePicture1}
              alt="Profile Picture"
              className="rounded-circle"
              style={{ width: "200px", height: "200px" }}
            />
          </Col>
          <Col>
            <h2 className="mb-3">Username</h2>
            <p className="text">user@email.com</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Posts</h3>
            <Card className="mb-3">
              <CardBody>
                <p>Example post content</p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>Example post content</p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>Example post content</p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>Example post content</p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
