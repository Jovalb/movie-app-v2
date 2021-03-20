import { useState } from "react";
import { Form } from "react-bootstrap";

export const MovieForm = ({ updateQuery, updateData }) => {
  const [state, setState] = useState("");

  function handleChange(event) {
    setState(event.target.value);
    console.log("state ", state);
  }

  async function handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();
    const endpoint = `http://localhost:3000/api/getData?movieTitle=${state}&pageNumber=${1}`;
    const res = await fetch(endpoint);
    const data = await res.json();
    if (data.Response === "True") {
      console.log("Response = ", data.Response);
      updateQuery(state, 1);
    //   updateData();
      //   updateCurrentHref(endpoint);
    } else {
      alert("Error!");
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Start searching for a movie here!</Form.Label>
        <Form.Control
          size="lg"
          type="text"
          value={state}
          onChange={handleChange}
          placeholder="Enter movie title"
        />
      </Form.Group>
    </Form>
  );
};
