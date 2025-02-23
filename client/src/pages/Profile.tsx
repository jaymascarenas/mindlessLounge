import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, CardText } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import type { UserData } from "../interfaces/UserData";

export default function Profile() {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/profile/1"); // Replace '1' with the actual user ID
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <img
            src={user.profilePicture}
            alt={user.username}
            className="img-fluid rounded-circle mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <h2 className="mb-3">{user.username}</h2>
          <p className="text-muted">{user.email}</p>
          <p>{user.aboutMe}</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <h3 className="mb-3">Posts</h3>
          {user.posts.map((post) => (
            <Card key={post.id} className="mb-3">
              <CardBody>
                <CardText>{post.content}</CardText>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
