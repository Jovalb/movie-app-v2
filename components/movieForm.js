import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import styles from "./movieForm.module.css";

export const MovieForm = ({ updateQuery }) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [type, setType] = useState("");

  function handleChange(event) {
    if (event.target.tagName == "SELECT") {
      setType(event.target.value);
    } else {
      setMovieTitle(event.target.value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}&type=${type}`;
    console.log(endpoint);
    const res = await fetch(endpoint);
    const data = await res.json();
    console.log(data.Response);
    if (data.Response === "True") {
      console.log("Response = ", data.Response);
      updateQuery(movieTitle, type, 1);
    } else {
      alert("Please enter a valid movie title!");
    }
  }

  return (
    <Row className={styles.mainRow}>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Start searching for a movie here!</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            value={movieTitle}
            onChange={handleChange}
            placeholder="Enter movie title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Select a category here</Form.Label>
          <Form.Control size="lg" as="select" onChange={handleChange}>
            <option value="">All</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="game">Game</option>
          </Form.Control>
        </Form.Group>
      </Form>
    </Row>
  );
};
