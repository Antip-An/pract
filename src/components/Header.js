import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useLocation, useNavigate  } from "react-router";
import { Link } from "react-router-dom";
import useToken from "../hooks/useToken";
import "./header.css";

const Header = () => {
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
            <Nav.Link as={Link} to="/users" disabled={pathname === "/users"}>Пользователи</Nav.Link>
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