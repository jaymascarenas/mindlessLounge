import React from "react";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import auth from "../utils/auth";
import logo from "../assets/images/mindless-logo-full.png";

const NavbarComponent = () => {
  return (
    <Navbar
      style={{
        backgroundColor: "#DCB7EA",
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        position: "sticky",
        top: 0,
        borderRadius: "10px",
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
            maxHeight: "100px",
          }}
        />
      </div>
      <Nav
        vertical
        className="w-100 flex-grow-1 d-flex flex-column justify-content-between"
      >
        <div>
          <NavItem className="mb-2">
            <Button
              style={{
                backgroundColor: "#AE55B4",
                boxShadow: "4px 6px 8px rgba(0, 0, 0, 0.3)",
              }}
              tag={Link}
              to="/feed"
              block
            >
              Feed
            </Button>
          </NavItem>
          <NavItem className="mb-2">
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
