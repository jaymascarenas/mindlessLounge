import { useState, type FormEvent, type ChangeEvent } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";

import Auth from "../utils/auth";
import { signup } from "../api/authAPI";
import type { UserSignup } from "../interfaces/UserSignup";
import "../assets/css/index.css";

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
        <Button color="primary" block>
          Sign Up
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;
