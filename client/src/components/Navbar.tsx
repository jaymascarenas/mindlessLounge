import React, { useState } from "react";
import { Navbar, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";
import auth from "../utils/auth";

const NavbarComponent = () => {
  const [loginCheck, setLoginCheck] = useState(auth.loggedIn());

  return (
    <Navbar color="light" light className="flex-column vh-100 p-3">
      <h1 className="mb-4">Authentication Review</h1>
      <Nav vertical className="w-100">
        {!loginCheck ? (
          <>
            <NavItem className="mb-2">
              <Button color="primary" tag={Link} to="/signup" block>
                Signup
              </Button>
            </NavItem>
            <NavItem>
              <Button color="primary" tag={Link} to="/login" block>
                Login
              </Button>
            </NavItem>
          </>
        ) : (
          <NavItem>
            <Button
              color="primary"
              onClick={() => {
                auth.logout();
                setLoginCheck(false);
              }}
              block
            >
              Logout
            </Button>
          </NavItem>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavbarComponent;
