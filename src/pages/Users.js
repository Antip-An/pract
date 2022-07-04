import Card from "react-bootstrap/Card";

import "./css/users.css";

const Users = () => {
    return (
        <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
            <Card.Body>
                <h1>Пользователи</h1>
            </Card.Body>
        </Card>
    );
};

export default Users;