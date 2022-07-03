import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import "./css/courses.css";

const Courses = () => {
  return (
    <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
      <Card.Body>
        <Form.Select
          style={{
            width: "50rem",
            margin: 20,
            marginBottom: 20,
            marginTop: 20,
          }}
        >
          <option>Все кафедры</option>
          <option value="1">ИБ ОО и цифровая гигиена педагога (ЦОС)</option>
          <option value="2">
            Современные цифровые технологии в образовании (ЦОС)
          </option>
          <option value="3">
            ЭО и ДОТ, региональные и федеральные системы ЭДО, цифровая дидактика
          </option>
          <option value="4">ИКТ и программирование</option>
          <option value="5">Региональные АИС</option>
        </Form.Select>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование курса</th>
              <th>СДО</th>
              <th>УТП</th>
              <th>РП</th>
              <th>Планируемые даты</th>
              <th>Кол-во часов</th>
              <th>Кол-во чел</th>
              <th>Кол-во групп</th>
              <th>Общее кол-во часов</th>
              <th>Преподаватель</th>
              <th>Форма проведения</th>
              <th>Категория слушателей</th>
              <th>Аннотация к курсу</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={14}>ИБ ОО и цифровая гигиена педагога (ЦОС)</td>
            </tr>
            <tr>
              <td>33</td>
              <td>Организационно-правовая защита информационных систем персональных данных образовательной организации</td>
              <td>не определено</td>
              <td></td>
              <td></td>
              <td>март-апрель</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Courses;
