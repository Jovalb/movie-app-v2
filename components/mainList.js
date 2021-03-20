import { Col, Row } from "react-bootstrap";
import Movie from "./movie";

export const MainList = ({ results }) => {
    
  return (
    <Row>
      <Col>
        {results.map((result) => {
          return <Movie key={result.imdbID} props={result} />;
        })}
      </Col>
    </Row>
  );
};
