import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { getAuthtoken, removetoken } from "../helper/Storage";
export default function NavBar() {
  const navigate = useNavigate();
  const auth = getAuthtoken();
  const Logout = () => {
    removetoken();
    navigate("/");
  };
  return (
    <div>
      <Navbar style={{ backgroundColor: "#193175" }} data-bs-theme="dark">
        <Container>
          <Navbar.Brand>
            <Link
              className="nav-link text-bold text-lg"
              style={{ fontWeight: "bold" }}
            >
              💫 KEMET
            </Link>
          </Navbar.Brand>
          {/* Not authintcated routes */}
          {!auth && (
            <Nav className="me-auto">
              <Link className="nav-link" to={"/"}>
                Login
              </Link>
            </Nav>
          )}

          {/* authintcated routes */}
          {auth && (
            <>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-user"}>
                  ManageUser
                </Link>
              </Nav>

              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-legend"}>
                  ManageLegend
                </Link>
              </Nav>

              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-govern"}>
                  ManageGovernorate
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-tourism-places"}>
                  ManageTourismPlaces
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-offers"}>
                  ManageOffers
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-trips"}>
                  Managetrips
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-review"}>
                  ManageReviews
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" to={"/manage-order"}>
                  ManageOrders
                </Link>
              </Nav>
              <Nav className="me-auto">
                <Link className="nav-link" onClick={Logout}>
                  Logout
                </Link>
              </Nav>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
}
