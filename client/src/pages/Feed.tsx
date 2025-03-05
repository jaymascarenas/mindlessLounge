import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Input,
  InputGroup,
} from "reactstrap";
import brainIcon from "../assets/images/brain-icon.png";
import { useEffect, useState } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { UserData, Post } from "../interfaces/UserData";
import { retrieveUserData } from "../api/userAPI";

// Weather data interface
interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

// Weather Component
const Weather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [city, setCity] = useState<string>("London");
  const [inputCity, setInputCity] = useState<string>("");

  const fetchWeather = async (cityName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/weather?city=${cityName}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Weather API request failed with status ${response.status}`
        );
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(
        "Failed to load weather data. City may not exist or there may be a connection issue."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCity(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCity.trim()) {
      setCity(inputCity.trim());
      setInputCity("");
    }
  };

  // Popular cities for quick selection
  const popularCities = ["London", "New York", "Tokyo", "Paris", "Sydney"];

  return (
    <div className="weather-widget">
      <h5 className="text-center fw-bold">Weather</h5>

      <form onSubmit={handleSubmit} className="mb-3">
        <InputGroup size="sm">
          <Input
            type="text"
            placeholder="Enter city name"
            value={inputCity}
            onChange={handleCityChange}
          />
          <Button color="primary" type="submit">
            Search
          </Button>
        </InputGroup>
      </form>

      <div className="popular-cities mb-3">
        <div className="d-flex flex-wrap justify-content-center gap-1">
          {popularCities.map((popularCity) => (
            <Button
              key={popularCity}
              color="light"
              size="sm"
              className="mb-1"
              onClick={() => setCity(popularCity)}
            >
              {popularCity}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center">Loading weather...</div>
      ) : error ? (
        <div className="text-danger">{error}</div>
      ) : weatherData ? (
        <>
          <div className="text-center mb-3">
            <h6>
              {weatherData.name}, {weatherData.sys.country}
            </h6>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                style={{ width: "50px", height: "50px" }}
              />
              <span className="fs-4">
                {Math.round(weatherData.main.temp)}°C
              </span>
            </div>
            <div>{weatherData.weather[0].description}</div>
          </div>
          <div className="weather-details small">
            <div>
              <strong>Feels like:</strong>{" "}
              {Math.round(weatherData.main.feels_like)}°C
            </div>
            <div>
              <strong>Humidity:</strong> {weatherData.main.humidity}%
            </div>
            <div>
              <strong>Wind:</strong> {weatherData.wind.speed} m/s
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

// function that shuffles the top business headlines in our news card
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function Feed() {
  interface Article {
    title: string;
    description: string;
    url: string;
  }
  const [newsHeadlines, setNewsHeadlines] = useState<Article[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/news", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Auth.getToken()}`,
          },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Invalid news API response, check network tab!");
        }
        const shuffledArticles = shuffleArray(data.articles as Article[]);
        setNewsHeadlines(shuffledArticles.slice(0, 3));
      } catch (err) {
        console.error("Error fetching news:", err);
      }
    };
    fetchNews();
  }, []);
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
        className="min-vh-100 d-flex flex-column bg-primary"
        style={{ backgroundColor: "#6C88D8", borderRadius: "10px" }}
      >
        <Container className="py-4">
          {/* Header */}
          <h1
            className="text-purple text-decoration-underline fw-normal"
            style={{ fontSize: "4rem", color: "#FFFFFF" }}
          >
            Welcome to the Mindless Lounge
          </h1>

          <Row className="mt-4">
            {/* Left Section (Main Content) */}
            <Col md={9}>
              {/* First Post Box */}
              <Card className="border border-dark mb-4">
                <CardBody>
                  <div className="fw-bold">Madame Bouvier</div>
                  <div className="mt-2">
                    {" "}
                    Lisa and Bart are fighting again, we really should have
                    gotten a lock for her saxophone case
                  </div>
                </CardBody>
              </Card>

              {/* Sample News/Weather Section */}
              <Card className="border border-dark mb-4">
                <CardBody className="text-center fw-bold">
                  Top Business Headlines from NewsApi.org
                </CardBody>
              </Card>
              {/* Second Post Box */}
              <Card className="border border-dark mb-4">
                <CardBody>
                  <div className="fw-bold">Madame Bouvier</div>
                  <div className="mt-2">
                    {" "}
                    I'll be a nuclear technician at the Power Plant today, I
                    can't wait to give Mr. Burns a piece of my mind
                  </div>
                </CardBody>
              </Card>

              {/* Post Button & Brain Icon */}
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

            {/* Right Sidebar */}
            <Col md={3} className="text-center">
              {/* Logo */}
              <div className="mb-4"></div>

              {/* Sidebar Links */}
              <div className="d-flex flex-column align-items-center text-dark">
                <div className="fs-5"></div>
                <div className="fs-5 mt-3"></div>
                <div className="fs-5 mt-3"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  //the code above dispplays when the user data isn't populating, so it shows a sample feed
  return (
    <div
      className="min-vh-100 d-flex flex-column bg-primary"
      style={{
        backgroundColor: "#6C88D8",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Container className="py-4">
        {/* Header */}
        <h1
          className="text-purple text-decoration-underline fw-normal"
          style={{ fontSize: "4rem", color: "#FFFFFF", padding: "20px" }}
        >
          Welcome to the Mindless Lounge
        </h1>
        {/* News Section */}
        <Row className="mb-4">
          <Col md={8}>
            <Card className="border border-dark h-100">
              <CardBody>
                <h5 className="text-center fw-bold">Top Business Headlines</h5>
                {newsHeadlines.length > 0 ? (
                  newsHeadlines.map((article, index) => (
                    <div key={index} className="mb-3">
                      <h6>{article.title}</h6>
                      <p>{article.description}</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Read more
                      </a>
                    </div>
                  ))
                ) : (
                  <p>Loading news headlines...</p>
                )}
              </CardBody>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="border border-dark h-100">
              <CardBody>
                <Weather />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="text-white mt-4">
          <Col>
            <h3>Posts</h3>
            {userData.posts && userData.posts.length > 0 ? (
              userData.posts.map((post: Post) => (
                <Card key={post.id} className="border border-dark mb-4">
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
