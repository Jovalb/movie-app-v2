import { useState } from "react";
import { Form, Row } from "react-bootstrap";
import styles from "./movieForm.module.css"

export const MovieForm = ({ updateQuery }) => {
  const [movieTitle, setMovieTitle] = useState("");

  function handleChange(event) {
    setMovieTitle(event.target.value);
    console.log("movieTitle ", movieTitle);
  }

  async function handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    if (data.Response === "True") {
      console.log("Response = ", data.Response);
      updateQuery(movieTitle, 1);
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
      </Form>
    </Row>
  );
};
