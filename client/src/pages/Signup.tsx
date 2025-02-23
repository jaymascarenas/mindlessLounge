import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
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

  useEffect(() => {
    // Set the background color when the component mounts
    document.body.style.backgroundColor = "#DCB7EA";

    // Reset the background color when the component unmounts
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#AE55B4",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "10px",
        boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
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
