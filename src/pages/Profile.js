import { useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router";
import useToken from "../hooks/useToken";

import "./css/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  return (
    <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
      <h1>Роль - Имя</h1>
      <h3>Почта</h3>
      <Button
        className="out"
        variant="primary"
        onClick={() => {
          onLogout();
          navigate("/login");
        }}
      >
        Выйти
      </Button>

      <h4>Изменение пароля</h4>
      <Form className="profile">
        <Form.Group className="pass">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="pass2">
          <Form.Label>Повторите пароль</Form.Label>
          <Form.Control
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </Form.Group>
        <Button className="save">Сохранить изменения</Button>
      </Form>
    </Card>
  );
};

export default Profile;
