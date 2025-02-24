import React, { useState, useEffect, useCallback } from "react";
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

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const fetchUserData = useCallback(async () => {
    try {
      const endpoint = username ? `/api/profile/${username}` : "/api/profile";
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch user data");
      const data: UserData = await response.json();
      setUserData(data);
      setAboutMe(data.aboutMe);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [username]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ aboutMe }),
      });
      if (!response.ok) throw new Error("Failed to update profile");
      const updatedUserData: UserData = await response.json();
      setUserData(updatedUserData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!userData) return <div>Loading...</div>;

  return (
    <Container className="my-5">
      <Row>
        <Col md={4}>
          <img
            src={userData.profilePicture || "/default-avatar.png"}
            alt={userData.username}
            className="img-fluid rounded-circle mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        </Col>
        <Col md={8}>
          <h2 className="mb-3">{userData.username}</h2>
          <p className="text-muted">{userData.email}</p>
          {isEditing ? (
            <Form onSubmit={handleUpdateProfile}>
              <FormGroup>
                <Label for="aboutMe">About Me</Label>
                <Input
                  type="textarea"
                  name="aboutMe"
                  id="aboutMe"
                  value={aboutMe}
                  onChange={(e) => setAboutMe(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>
              <Button color="secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </Form>
          ) : (
            <>
              <p>{userData.aboutMe}</p>
              {!username && (
                <Button color="primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </>
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h3>Posts</h3>
          {userData.posts.map((post: Post) => (
            <Card key={post.id} className="mb-3">
              <CardBody>
                <p>{post.content}</p>
                <small className="text-muted">
                  Posted on: {new Date(post.createdAt).toLocaleString()}
                </small>
              </CardBody>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
