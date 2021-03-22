import styles from './movie.module.css';
import { Card } from "react-bootstrap";

const Movie = ({ props }) => {
  const { Title, Year, imdbID, Type, Poster } = props;
  return (
    <Card className={styles.movieCard}>
      <Card.Img className={styles.cardImg}  src={Poster} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Year}</Card.Text>
        <Card.Text>{Type}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Movie;
