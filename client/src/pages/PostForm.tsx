import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { createPost } from "../api/userAPI";
import brainIcon from "../assets/images/brain-icon.png";

const PostForm = () => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      setError("Please write something before posting.");
      return;
    }
    setError("");
    try {
      const response = await createPost(content);
      console.log(response);
      navigate("/feed");
    } catch (error) {
      console.error("Error creating post:", error);
      setError(
        "Failed to create post because your login has timed out. Please try again."
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#AE55B4",
        minHeight: "100%",
        borderRadius: "10px",
        boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
        padding: "40px",
        color: "white",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleText">Write your thoughts!</Label>
          <Input
            id="exampleText"
            name="text"
            type="textarea"
            style={{ padding: "10px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>

        {error && <Alert color="danger">{error}</Alert>}

        <div className="d-flex align-items-center justify-content-center">
          <Button
            color="light"
            outline
            className="border border-danger px-4 me-2"
            type="submit"
          >
            POST
          </Button>
          <img
            src={brainIcon}
            alt="Brain Icon"
            style={{ width: "50px", height: "50px" }}
          />
        </div>
      </Form>
    </div>
  );
};

export default PostForm;
