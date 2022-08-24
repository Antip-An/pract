import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate  } from "react-router";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import useToken from "../hooks/useToken";
import "./header.css";

const Header = () => {
  const userRole =
    jwtDecode(localStorage.getItem("token")).user.role || "VIEWER";
  const { pathname } = useLocation();
  const navigate = useNavigate()
  const { loggedIn } = useToken();

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link as={Link} to="/" disabled={pathname === "/"}>Курсы</Nav.Link>
            <Nav.Link as={Link} to="/halfyear" disabled={pathname === "/halfyear"}>Полугодия</Nav.Link>
            {userRole === "ADMIN" ? <Nav.Link as={Link} to="/users" disabled={pathname === "/users"}>Пользователи</Nav.Link> : null}
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Link as={Link} to="/profile" disabled={pathname === "/profile"}>Профиль</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;