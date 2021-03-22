import React, { useEffect, useState } from "react";
import { FormControlProps } from "react-bootstrap";
import { Form, Row } from "react-bootstrap";
import styles from "./movieForm.module.css";

const MovieForm = ({ updateQuery }) => {
  let currentYear = new Date().getFullYear();
  let yearList: Array<number> = [];
  let items = [];
  const [movieTitle, setMovieTitle] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  fillYears(1880, currentYear, items);

  const handleChange = (event) => {
    switch (event.target.id) {
      case "category":
        setType(event.target.value);
        break;
      case "titleInput":
        setMovieTitle(event.target.value);
        break;

      case "yearSelector":
        setYear(event.target.value);

        break;
      default:
        break;
    }

    // if (event.target.tagName == "SELECT") {
    //   console.log(event.target.id);
    //   setType(event.target.value);
    // } else {
    //   console.log(event.target.id);
    //   setMovieTitle(event.target.value);
    // }
  };

  const handleSubmit = async (event: React.FormEvent<FormControlProps>) => {
    event.preventDefault();
    if (!(await validateFetchYear(movieTitle, type, year))) {
      alert("Could not find any results for year : " + year);
    } else {
      const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}&type=${type}&year=${year}`;
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.Response === "True") {
        updateQuery(movieTitle, type, 1, year);
      } else {
        alert("Could not find any results, try again!");
      }
    }
  };

  return (
    <Row className={styles.mainRow}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Start searching for a movie here!</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            id="titleInput"
            value={movieTitle}
            onChange={handleChange}
            placeholder="Enter movie title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select a category here</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            id="category"
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="game">Game</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select a year here</Form.Label>
          <Form.Control
            size="lg"
            as="select"
            id="yearSelector"
            onChange={handleChange}
          >
            <option value="">All</option>
            {items}
          </Form.Control>
        </Form.Group>
      </Form>
    </Row>
  );
};

const fillYears = (startYear, currentYear, itemsArr) => {
  let yearArr: Array<number> = [];
  while (startYear <= currentYear) {
    itemsArr.push(
      <option key={startYear} value={startYear}>
        {startYear}
      </option>
    );
    startYear++;
  }
  itemsArr = itemsArr.reverse()
};

const validateFetchYear = async (
  movieTitle: string,
  type: string,
  year: string
) => {
  const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}&type=${type}&year=${year}`;
  const res = await fetch(endpoint);
  const data = await res.json();
  if (data.Response === "False") {
    return false;
  } else {
    return true;
  }
};

export default MovieForm;
