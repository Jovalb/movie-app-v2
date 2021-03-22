import styles from './movie.module.css';
import { Card } from "react-bootstrap";

//Component for a single movie
const Movie = ({ props }) => {
  //Takes props from a movie object and destructures the elements
  const { Title, Year, Type, Poster } = props;
  return (
    // Here i am mainly using bootstrap card component with some styling and inserting the props
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
