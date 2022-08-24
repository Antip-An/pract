import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { useEffect, useState } from "react";
import useLoginGuard from "../hooks/useLoginGuard";
import { postData } from "../utils/network";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router";

const Users = () => {
  useLoginGuard({ loggedIn: false, path: "/login" });
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const userRole = jwtDecode(localStorage.getItem("token")).user.role || "VIEWER";

  const fetchData = async () => {
    const response = (await postData("users/all", {})) || {};
    if (!response.success) {
      return;
    }
    setUsers(response.data);
  };

  useEffect(() => {
    if (userRole !== "ADMIN") {
      navigate("/")
    }
    fetchData();
  });

  return (
    <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Логин</th>
              <th>Электронная почта</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>
                    {user.username}
                  </td>
                  <td>
                    {user.email}
                  </td>
                </tr>
              ))
            ) : (
              <tr>Курсы не найдены</tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Users;
