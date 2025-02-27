import { Link } from "react-router-dom";
import error404Image from "../assets/images/error-404.png"; // Adjust path as needed

const ErrorPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#86A7E8", // Matching your homepage background
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          textAlign: "center",
        }}
      >
        <img
          src={error404Image}
          alt="404 Error - Page Not Found"
          style={{
            width: "100%",
            maxWidth: "500px",
            marginBottom: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          }}
        />

        <h1
          style={{
            color: "#2A4374",
            fontSize: "2rem",
            marginBottom: "20px",
          }}
        >
          Oops! Page Not Found
        </h1>

        <p
          style={{
            color: "#2A4374",
            fontSize: "1.2rem",
            marginBottom: "30px",
          }}
        >
          Looks like our brain is taking a break! Let's get you back on track.
        </p>

        <Link
          to="/"
          style={{
            backgroundColor: "#2A4374",
            color: "white",
            padding: "12px 30px",
            borderRadius: "25px",
            textDecoration: "none",
            fontSize: "1.1rem",
            transition: "transform 0.3s ease, background-color 0.3s ease",
            display: "inline-block",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#3A5495";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#2A4374";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
