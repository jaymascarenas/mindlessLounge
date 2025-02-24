import { Navbar, Nav, NavItem, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import auth from "../utils/auth";
import logo from "../assets/images/mindless-logo-full.png";

const NavbarComponent = () => {
  const location = useLocation();
  const isOnFeed = location.pathname === "/feed";

  return (
    <Navbar
      style={{
        backgroundColor: "#DCB7EA",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "sticky",
        top: 0,
        borderRadius: "10px",
        boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
      }}
      light
      className="p-3"
    >
      <div className="mb-4 d-flex justify-content-center w-100">
        <img
          src={logo}
          alt="Mindless Logo"
          style={{
            maxWidth: "100%",
            height: "auto",
            maxHeight: "150px",
            borderRadius: "10px",
          }}
        />
      </div>
      <Nav
        vertical
        className="w-100 flex-grow-1 d-flex flex-column justify-content-between"
      >
        <div>
          <NavItem className="mb-3">
            <Button
              style={{
                backgroundColor: "#AE55B4",
                boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
              }}
              tag={Link}
              to={isOnFeed ? "/profile" : "/feed"}
              block
            >
              {isOnFeed ? "Profile" : "Feed"}
            </Button>
          </NavItem>
          <NavItem className="mb-3">
            <Button
              style={{
                backgroundColor: "#AE55B4",
                boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
              }}
              tag={Link}
              to="/settings"
              block
            >
              Settings
            </Button>
          </NavItem>
        </div>
        <NavItem>
          <Button
            style={{
              backgroundColor: "#AE55B4",
              boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
            }}
            onClick={() => {
              auth.logout();
              // Redirect or update app state after logout
            }}
            block
          >
            Logout
          </Button>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
