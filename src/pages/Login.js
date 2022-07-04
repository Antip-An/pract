import { useState } from "react";

import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { useNavigate } from "react-router";
import { getData, postData } from "../utils/network";
import useLoginGuard from "../hooks/useLoginGuard";

import "./css/login.css";

const LoginPage = () => {
  useLoginGuard({ loggedIn: true, path: "/" });
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const response = await postData("/auth/login", { username, password });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR") setPassword("");
      return;
    }

    localStorage.setItem("token", response.accessToken);

    navigate("/");
  };

  return (
    <Container>
      <Row>
        <Col md={3} sm={0} />
        <Col md={6} sm={12}>
          <Card style={{ marginTop: 50 }}>
            <Card.Body>
              <Card.Title>Вход в систему</Card.Title>
              <Form>
                <Form.Group className="login-fg">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    id="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="login-fg">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </Form.Group>
              </Form>
              <Button className="in" onClick={onLogin}>
                Войти
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} sm={0} />
      </Row>
    </Container>
  );
};

export default LoginPage;
