import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { postData } from "../utils/network";

const Halfyear = () => {
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);

  const getDates = (start, end, step) => {
    let dates = [];
    for (
      let date = new Date(start);
      date <= new Date(end);
      date.setDate(date.getDate() + step)
    ) {
      dates.push(new Date(date));
    }
    return dates;
  };

  const fetchData = async () => {
    const resCourses = (await postData("/courses/all", {})) || {};
    if (!resCourses.success) {
      return;
    }
    setCourses(resCourses.data);

    const resYears = (await postData("/years/all", {})) || {};
    if (!resYears.success) {
      return;
    }
    setYears(resYears.data);
  };

  useEffect(() => {
    fetchData();
  });

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
          <option>Все расписание</option>
          {years
            ? years.map((year) => (
                <option value={year.id} key={year.id}>
                  {year.year}
                </option>
              ))
            : null}
        </Form.Select>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование курса</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Шаг</th>
              {getDates("2022-01-01", "2022-08-31", 4).map((date) => (
                <th
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >{`${date.getFullYear()}-${
                  date.getMonth() + 1
                }-${date.getDate()}`}</th>
              ))}
            </tr>
          </thead>
          {courses
            ? courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.number}</td>
                  <td>{course.name}</td>
                  <td>{course.startDate}</td>
                  <td>{course.endDate}</td>
                </tr>
              ))
            : null}
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Halfyear;
