import {
  Button,
  Col,
  Row,
  Container,
  CardDeck,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Movie from "./movie";
import { MovieModal, WatchListModal } from "./movieModal";
import styles from "./mainList.module.css";
import store from "store2";

// Component for mainlist that takes the results and populates a movie list
export const MainList = ({
  results,
  router,
  disableAdd,
  disableSub,
  incrementPageNumber,
  decrementPageNumber,
  totalResults,
}) => {

  // uses state and use effect for storing temporary data to the watch list.
  // Here i am using store2's session to store the list temporarily on the website. 
  // If you close the page you lose the temporary data, but if you refresh it stays
  const [watchList, setWatchList] = useState(
    store.session.get("cachedList") || []
  );

  // use effect that updates the session data every time the watch list is updated
  useEffect(() => {
    store.session.set("cachedList", temporaryList);
  });

  // temporary variable for saving the watch list
  let temporaryList = watchList;

  // function for adding a movie to the watch list with IMDB-ID as key
  const handleAdd = (event) => {

    // boolean to check if movie already is added to the watch list
    let alreadyExists = false;
    watchList.forEach((element) => {
      if (element.imdbID === event) {
        alreadyExists = true;
      }
    });
    // returns and alert if the movie already exists in the watch list
    if (alreadyExists) {
      alert("Already added to watch list!");
      return;
    }

    // Here i am checking for duplicates and pushing to the list only once
    let alreadyAdded = false;
    results.forEach((element) => {
      if (element.imdbID === event && !alreadyAdded) {
        temporaryList.push(element);
        alreadyAdded = true;
      }
    });

    // Update inf the watch list state and refreshing the data via the router
    setWatchList(temporaryList);
    router.replace(router.asPath);
  };

  // Function for removal of movies from the watch list
  const handleRemove = (event) => {
    // Finds the movie
    watchList.forEach((element) => {
      if (element.imdbID === event) {
        watchList.pop(element);
      }
    });
    // Refresh data when finished
    router.replace(router.asPath);
  };

  return (
    <Container>
      <Row>
        <Col className={styles.listHeader}>
          <h2>MovieList</h2>
          <p>Total Results found : {totalResults}</p>
          <Button disabled={disableAdd} onClick={() => incrementPageNumber()}>
            Next
          </Button>
          <Button disabled={disableSub} onClick={() => decrementPageNumber()}>
            Prev
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardDeck className={styles.cardDeck}>
            {results.map((result) => {
              return (
                // Modal wrapped around each movie component to give them a modal popup box when clicked
                <MovieModal handleAdd={handleAdd}>
                  <Movie key={result.imdbID} props={result} />
                </MovieModal>
              );
            })}
          </CardDeck>
        </Col>
      </Row>
      <Row>
        <Col className={styles.listHeader}>
          <h2>Watch List</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardDeck className={styles.cardDeck}>
            {watchList.map((result) => {
              return (
                <WatchListModal handleRemove={handleRemove}>
                  <Movie key={result.imdbID} props={result} />
                </WatchListModal>
              );
            })}
          </CardDeck>
        </Col>
      </Row>
    </Container>
  );
};
