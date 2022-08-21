import { utils, writeFile } from "xlsx";

import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import { useEffect, useState } from "react";
import { postData } from "../utils/network";
import useLoginGuard from "../hooks/useLoginGuard";

import "./css/halfyear.css";

import "./css/halfyear.css";

const Halfyear = () => {
  useLoginGuard({ loggedIn: false, path: "/login" });
  const [courses, setCourses] = useState([]);
  const [years, setYears] = useState([]);
  const [year, setYear] = useState(null);

  const changeYear = async (e) => {
    setYear(e.target.value);
    console.log(e.target.value);
    const resCourses =
      (await postData("/courses/schedule", {
        year: e.target.value,
      })) || {};
    if (!resCourses.success) {
      return;
    }
    setCourses(resCourses.data);
  };

  const convertToXLSX = (e) => {
    const table = document.getElementById("schedule");
    const workbook = utils.table_to_book(table, {
      sheet: `Расписание`,
    });
    return writeFile(workbook, `Расписание.xlsx`);
  };

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

  const getClasses = (start, end, courseStart, courseEnd, step) => {
    let cs = new Date(courseStart);
    let ce = new Date(courseEnd);

    let dates = getDates(start, end, step);

    let classes = [];

    for (let date of dates) {
      if (date >= new Date(courseStart) && date <= new Date(courseEnd)) {
        classes.push({
          date: date,
          class: true,
        });
      } else {
        classes.push({
          date: date,
          class: false,
        });
      }
    }
    return classes;
  };

  const fetchData = async () => {
    const resCourses = (await postData("/courses/schedule", { year })) || {};
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
  }, []);

  return (
    <Card style={{ width: "95%", margin: "auto", marginTop: 20 }}>
      <Card.Header>
        <Form.Select
          style={{
            width: "50rem",
            margin: 20,
            marginBottom: 20,
            marginTop: 20,
          }}
          value={year}
          onChange={changeYear}
        >
          <option value="">Выберите год</option>
          {years
            ? years.map((year) => (
                <option value={year.year} key={year.id}>
                  {year.year}
                </option>
              ))
            : null}
        </Form.Select>
      </Card.Header>
      <Card.Body
        style={{ overflowX: "scroll", display: year ? "initial" : "none" }}
      >
        <Table id="schedule" striped bordered hover size="sm">
          <thead>
            <tr>
              <th>№</th>
              <th>Наименование курса</th>
              <th>Дата начала</th>
              <th>Дата окончания</th>
              <th>Шаг</th>
              {getDates(`${year}-01-01`, `${year}-08-31`, 4).map((date) => (
                <th
                  style={{
                    writingMode: "vertical-rl",
                    transform: "scale(-1, -1)",
                  }}
                >{`${String(date.getDate()).padStart(2, "0")}.${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}`}</th>
              ))}
              {getDates(`${year}-09-01`, `${year}-12-31`, 4).map((date) => (
                <th
                  style={{
                    writingMode: "vertical-rl",
                    transform: "scale(-1, -1)",
                  }}
                >{`${String(date.getDate()).padStart(2, "0")}.${String(
                  date.getMonth() + 1
                ).padStart(2, "0")}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courses
              ? courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.number}</td>
                    <td>{course.name}</td>
                    <td>{`${String(
                      new Date(course.startDate).getDate()
                    ).padStart(2, "0")}.${String(
                      new Date(course.startDate).getMonth() + 1
                    ).padStart(2, "0")}.${String(
                      new Date(course.startDate).getFullYear()
                    )}`}</td>
                    <td>{`${String(new Date(course.endDate).getDate()).padStart(
                      2,
                      "0"
                    )}.${String(
                      new Date(course.endDate).getMonth() + 1
                    ).padStart(2, "0")}.${String(
                      new Date(course.endDate).getFullYear()
                    )}`}</td>
                    <td>
                      {(new Date(course.endDate) - new Date(course.startDate)) /
                        1000 /
                        60 /
                        60 /
                        24 +
                        1}
                    </td>
                    {getClasses(
                      `${year}-01-01`,
                      `${year}-08-31`,
                      course.startDate,
                      course.endDate,
                      4
                    ).map((date, i) => (
                      <td
                        key={i}
                        style={{
                          backgroundColor: date.class ? "wheat" : "initial",
                        }}
                      >
                        <p style={{visibility: "hidden"}}>{date.class ? "+" : " "}</p>
                      </td>
                    ))}
                    {getClasses(
                      `${year}-09-01`,
                      `${year}-12-31`,
                      course.startDate,
                      course.endDate,
                      4
                    ).map((date, i) => (
                      <td
                        key={i}
                        style={{
                          backgroundColor: date.class ? "wheat" : "initial",
                        }}
                      >
                        <p style={{visibility: "hidden"}}>{date.class ? "+" : " "}</p>
                      </td>
                    ))}
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Card.Body>
      <Card.Footer style={{ display: year ? "flex" : "none", justifyContent: "flex-end" }}>
        <Button variant="secondary" onClick={convertToXLSX}>
          Скачать как XLSX
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Halfyear;
