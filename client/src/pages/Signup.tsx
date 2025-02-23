import { useState, type FormEvent, type ChangeEvent } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

import Auth from "../utils/auth";
import { signup } from "../api/authAPI";
import type { UserSignup } from "../interfaces/UserSignup";
import brainIcon from "../assets/images/brain-icon.png";

const Signup = () => {
  const [signupData, setSignupData] = useState<UserSignup>({
    username: "",
    email: "",
    password: "",
    profilePicture: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(signupData); // a token
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#993399", // Replace with your desired color
        minHeight: "100vh", // This ensures the color covers the full viewport height
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container className="mt-5">
        <h2 className="text-center mb-4">
          Sign Up to Begin Your Mindless Journey
        </h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              value={signupData.username || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={signupData.email || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              value={signupData.password || ""}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%", // or a specific height if needed
            }}
          >
            <button
              type="submit"
              className="image-button"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "30px 0",
              }}
            >
              <img
                src={brainIcon}
                alt="Sign Up with Brain Icon"
                style={{
                  width: "100px",
                  opacity: 0.9,
                }}
              />
            </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Signup;
