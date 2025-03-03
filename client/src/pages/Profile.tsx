import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { retrieveUserData } from "../api/userAPI";
import { UserData, Post } from "../interfaces/UserData";
import { Link } from "react-router-dom";
import profilePicture1 from "../assets/images/profilePicture1.jpeg";
import brainIcon from "../assets/images/brain-icon.png";

export default function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const fetchedUserData = await retrieveUserData();
        setUserData(fetchedUserData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);
  if (!userData) {
    return (
      <div
        style={{
          backgroundColor: "#AE55B4",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
                    Lisa and Bart are fighting again, we really should have
                    gotten a lock for her saxophone case
                  </p>
                  <small className="text-muted">
                    Posted on: {new Date().toLocaleString()}
                  </small>
                </CardBody>
              </Card>
              <Card className="mb-3">
                <CardBody>
                  <p>
                    I'll be a nuclear technician at the Power Plant today, I
                    can't wait to give Mr. Burns a piece of my mind
                  </p>
                  <small className="text-muted">
                    Posted on: {new Date().toLocaleString()}
                  </small>
                </CardBody>
              </Card>
              <Card className="mb-3">
                <CardBody>
                  <p>
                    I haven't seen Chief Wiggum in a while, I hope no one
                    poisoned his donuts
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
  return (
    <div
      style={{
        backgroundColor: "#AE55B4",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
              src={userData.profilePicture || profilePicture1}
              alt="Profile Picture"
              className="rounded-circle"
              style={{ width: "200px", height: "200px" }}
            />
          </Col>
          <Col>
            <h2 className="mb-3">{userData.username}</h2>
            <p className="text">{userData.email}</p>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h3>Posts</h3>
            {userData.posts && userData.posts.length > 0 ? (
              userData.posts.map((post: Post) => (
                <Card key={post.id} className="mb-3">
                  <CardBody>
                    <h5>{userData.username}</h5>
                    <p>{post.content}</p>
                    <small className="text-muted">
                      Posted on: {new Date(post.createdAt).toLocaleString()}
                    </small>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p>No posts available.</p>
            )}
            <div className="d-flex align-items-center justify-content-center">
              <Button
                color="light"
                outline
                className="border border-danger px-4 me-2"
                tag={Link}
                to="/post"
              >
                POST
              </Button>
              <img
                src={brainIcon}
                alt="Brain Icon"
                style={{ width: "50px", height: "50px" }}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
