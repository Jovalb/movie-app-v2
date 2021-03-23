import React, { useState } from "react";
import { FormControlProps } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Form, Row } from "react-bootstrap";
import validateSearch from "../pages/functions/validation";
import styles from "./movieForm.module.css";

// Component for the form used for searching and selecting on the page
const MovieForm = ({ updateQuery }) => {
  // Creating variables for implementation of year list from oldest movie to newest movie according to year
  let currentYear = new Date().getFullYear();
  let items = [];

  const [movieTitle, setMovieTitle] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");

  // Function that fills up the items array with jsx elements for the select form
  fillYears(1880, currentYear, items);

  // function for handling changes on the form
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
  };

  // Function for handling the submit when the user presses the "enter" key after searching for a movie
  const handleSubmit = async (event: React.FormEvent<FormControlProps>) => {
    // Prevent default for this event is called to stop the page from reloading after a submit
    event.preventDefault();

    // Validation of the input from the user, if the validation returns false it will return an error inside the function specifying what input was wrong
    if (!(await validateSearch(movieTitle, type, year))) {
      return;
    } else {
      // If the validation is correct the query gets updated and the page refetches new data with this query
      updateQuery(movieTitle, type, 1, year);
      // const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}&type=${type}&year=${year}`;
      // const res = await fetch(endpoint);
      // const data = await res.json();
      // if (data.Response === "True") {
      //   updateQuery(movieTitle, type, 1, year);
      // } else {
      //   alert("Could not find any results, try again!");
      // }
    }
  };

  return (
    // react bootstrap form used for this app
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
        <Button type="submit">Submit</Button>
      </Form>
    </Row>
  );
};

const fillYears = (startYear, currentYear, itemsArr) => {
  while (currentYear >= startYear) {
    itemsArr.push(
      <option key={currentYear} value={currentYear}>
        {currentYear}
      </option>
    );
    currentYear--;
  }
};

export default MovieForm;
