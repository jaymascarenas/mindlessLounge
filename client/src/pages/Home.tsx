import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { retrieveUsers } from "../api/userAPI";
import type { UserData } from "../interfaces/UserData";
import ErrorPage from "./ErrorPage";
import UserList from "../components/Users";
import auth from "../utils/auth";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

// Import your images
import brainMeeting from "../assets/images/brain-meeting.png";
import mindlessLogo from "../assets/images/mindless-logo.png";
import mindlessLogoFull from "../assets/images/mindless-logo-full.png";
import brainIcon from "../assets/images/brain-icon.png";

// NeonTrail class super cool cursor because I just had too
class NeonTrail {
  x: number;
  y: number;
  radius: number;
  color: string;
  opacity: number;
  hue: number;

  constructor(x: number, y: number, hue: number) {
    this.x = x;
    this.y = y;
    this.radius = 9;
    this.hue = hue;
    this.color = `hsl(${hue}, 180%, 50%)`;
    this.opacity = 1;
  }

  update() {
    this.opacity -= 0.025;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.opacity})`;
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.shadowBlur = 0;
  }
}

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState(false);
  const [loginCheck, setLoginCheck] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailsRef = useRef<NeonTrail[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const hueRef = useRef(0);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (loginCheck) {
      fetchUsers();
    }
  }, [loginCheck]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createTrail = (x: number, y: number) => {
      hueRef.current = (hueRef.current + 1) % 360;
      const trail = new NeonTrail(x, y, hueRef.current);
      trailsRef.current.push(trail);
    };

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = trailsRef.current.length - 1; i >= 0; i--) {
        const trail = trailsRef.current[i];
        trail.update();

        if (trail.opacity <= 0) {
          trailsRef.current.splice(i, 1);
          continue;
        }

        trail.draw(ctx);
      }

      createTrail(mouseRef.current.x, mouseRef.current.y);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    if (auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await retrieveUsers();
      setUsers(data);
    } catch (err) {
      console.error("Failed to retrieve tickets:", err);
      setError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your login logic here
  };

  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      {!loginCheck ? (
        <div
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            backgroundColor: "#87CEEB",
            display: "flex",
            flexDirection: "column",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "96px",
              padding: "64px 0",
            }}
          >
            {/* Left Side - Brain Meeting Image */}
            <div
              style={{
                width: "600px",
                height: "450px",
                borderRadius: "6px",
                overflow: "hidden",
                boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={brainMeeting}
                alt="Brain Meeting Illustration"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Right Side - Login Form */}
            <div
              style={{
                width: "400px",
                backgroundColor: "rgba(27, 71, 161, 0.4)",
                backdropFilter: "blur(8px)",
                borderRadius: "8px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <img
                src={mindlessLogoFull}
                alt="Mindless Lounge Logo"
                style={{
                  width: "80px",
                  marginBottom: "32px",
                  borderRadius: "8px",
                }}
              />

              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <FormGroup style={{ marginBottom: "24px" }}>
                  <Label
                    for="username"
                    style={{
                      fontSize: "1.125rem",
                      color: "#2A4374",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Email/Username:
                  </Label>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: "1px solid #2A4374",
                      borderRadius: "0",
                      padding: "8px 0",
                      color: "#2A4374",
                      fontSize: "1rem",
                      width: "100%",
                    }}
                  />
                </FormGroup>

                <FormGroup style={{ marginBottom: "32px" }}>
                  <Label
                    for="password"
                    style={{
                      fontSize: "1.125rem",
                      color: "#2A4374",
                      marginBottom: "8px",
                      display: "block",
                    }}
                  >
                    Password:
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderBottom: "1px solid #2A4374",
                      borderRadius: "0",
                      padding: "8px 0",
                      color: "#2A4374",
                      fontSize: "1rem",
                      width: "100%",
                    }}
                  />
                </FormGroup>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "16px",
                  }}
                >
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    style={{
                      background: "none",
                      border: "none",
                      padding: 0,
                      transition: "transform 0.2s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={brainIcon}
                      alt="Login"
                      style={{
                        width: "80px",
                        height: "80px",
                      }}
                      onClick={() => navigate("/feed")} // Add onClick handler
                    />
                  </button>
                </div>
              </Form>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <img
              src={mindlessLogo}
              alt="Mindless Lounge"
              style={{
                width: "300px",
                borderRadius: "8px",
              }}
            />
            <Link
              to="/signup"
              style={{
                fontSize: "1.125rem",
                color: "#2A4374",
                textDecoration: "none",
                marginLeft: "16px",
              }}
            >
              Create New Profile
            </Link>
          </div>
        </div>
      ) : (
        <UserList users={users} />
      )}
    </>
  );
};

export default Home;
