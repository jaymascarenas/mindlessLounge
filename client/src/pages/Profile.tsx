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
            <h2 className="mb-3">Madame Bouvier</h2>
            <p className="text">marge@simpsons.com</p>
            <p className="text">Springfield, USA</p>
            <p className="text">Homer's my main squeeze</p>
            <h3>Interests</h3>
            <p>Cooking, Painting, Pearls</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Posts</h3>
            <Card className="mb-3">
              <CardBody>
                <p>
                  Lisa and Bart are fighting again, we really should have gotten
                  a lock for her saxophone case
                </p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>
                  I'll be a nuclear technician at the Power Plant today, I can't
                  wait to give Mr. Burns a piece of my mind
                </p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>
                  I haven't seen Chief Wiggum in a while, I hope no one poisoned
                  his donuts
                </p>
                <small className="text-muted">
                  Posted on: {new Date().toLocaleString()}
                </small>
              </CardBody>
            </Card>
            <Card className="mb-3">
              <CardBody>
                <p>
                  Maggie found some dog food under the couch, at least it was
                  organic!
                </p>
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
