import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import { useEffect, useState } from "react";
import useLoginGuard from "../hooks/useLoginGuard";
import { postData } from "../utils/network";

const Users = () => {
  useLoginGuard({ loggedIn: false, path: "/login" });
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = (await postData("users/all", {})) || {};
    if (!response.success) {
      return;
    }
    setUsers(response.data);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
      <Card.Body>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Общее количество часов</th>
              <th>Количество тематик</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>
                    {user.Courses.map((c) => c.hours * c.groupNumber).reduce(
                      (a, b) => a + b,
                      0
                    )}
                  </td>
                  <td>{user.Courses.length}</td>
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
