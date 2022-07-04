import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import "./css/courses.css";
import { postData } from "../utils/network";
import { useEffect, useState } from "react";
import useLoginGuard from "../hooks/useLoginGuard";

const Courses = () => {
  useLoginGuard({ loggedIn: false, path: "/login" });
  const [courses, setCourses] = useState([]);
  const [cathedras, setCathedras] = useState([]);
  const [cathedraId, setCathedraId] = useState(0);

  const changeCathedra = async (e) => {
    setCathedraId(e.target.value);
    const resCourses =
      (await postData(
        "/courses/all",
        e.target.value !== "all"
          ? {
              CathedraId: e.target.value,
            }
          : {}
      )) || {};
    if (!resCourses.success) {
      return;
    }
    setCourses(resCourses.data);
  };

  const fetchData = async () => {
    const resCourses = (await postData("/courses/all", {})) || {};
    if (!resCourses.success) {
      return;
    }
    setCourses(resCourses.data);

    const resCathedras = (await postData("/cathedras/all")) || {};
    if (!resCathedras.success) {
      return;
    }
    setCathedras(resCathedras.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
          value={cathedraId}
          onChange={changeCathedra}
        >
          <option value={"all"}>Все кафедры</option>
          {cathedras
            ? cathedras.map((cathedra) => (
                <option value={cathedra.id} key={cathedra.id}>
                  {cathedra.name}
                </option>
              ))
            : null}
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
            {courses ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.Sdo.name}</td>
                  <td>{course.Utp.year}</td>
                  <td>{course.Rp.year}</td>
                  <td>
                    {course.startDate} — {course.endDate}
                  </td>
                  <td>{course.hours}</td>
                  <td>{course.capacity}</td>
                  <td>{course.groupNumber}</td>
                  <td>{course.hours * course.groupNumber}</td>
                  <td>
                    {course.Users.map((u) => u.name)
                      .sort()
                      .join(", ")}
                  </td>
                  <td>{course.Form.name}</td>
                  <td>
                    {course.ListenersCategories.map((c) => c.name)
                      .sort()
                      .join(", ")}
                  </td>
                  <td>{course.annotation}</td>
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

export default Courses;
