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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const response = await postData("/users/signin", { email, password });

    if (!response.success) {
      alert(response.message);
      if (response.code !== "NETWORK_ERROR") setPassword("");
      return;
    }

    localStorage.setItem("token", response.token);

    const res = await getData("/users/myself");
    if (!res.success) return;

    localStorage.setItem("role", res.user.role);
    
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
                  <Form.Label>Адрес электронной почты</Form.Label>
                  <Form.Control
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
