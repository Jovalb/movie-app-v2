import styles from "./movie.module.css";
import { Card } from "react-bootstrap";

const Movie = ({ props }) => {
  const { Title, Year, imdbID, Type } = props;
  return (
    <div key={imdbID}>
      <Card className={styles.card}>
        <Card.Body>
          <Card.Title>{Title}</Card.Title>
          <Card.Text>{Year}</Card.Text>
          <Card.Text>{Type}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Movie;