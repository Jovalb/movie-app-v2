import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import Movie from "./movie";
import { MovieModal, WatchListModal } from "./movieModal";
import styles from "./mainList.module.css";
import localStorage from "localStorage";

export const MainList = ({
  results,
  router,
  disableAdd,
  disableSub,
  incrementPageNumber,
  decrementPageNumber,
}) => {
  const cachedWatchList = JSON.parse(localStorage.getItem("cachedList"));
  const [watchList, setWatchList] = useState(cachedWatchList || []);

  if (cachedWatchList) {
    console.log("Local storage true!");
    console.log("Local storage : ", cachedWatchList);
  }

  console.log("Watchlist : ", watchList);
  let temporaryList = watchList;

  const handleAdd = (event) => {
    let alreadyExists = false;
    watchList.forEach((element) => {
      if (element.imdbID === event) {
        alreadyExists = true;
      }
    });
    if (alreadyExists) {
      alert("Already added to watch list!");
      return;
    }
    let elementAdded = false;

    results.forEach((element) => {
      if (element.imdbID === event && !elementAdded) {
        temporaryList.push(element);
        elementAdded = true;
      }
    });

    localStorage.setItem("cachedList", JSON.stringify(temporaryList));
    setWatchList(temporaryList);
    router.replace(router.asPath);
  };

  const handleRemove = (event) => {
    watchList.forEach((element) => {
      if (element.imdbID === event) {
        watchList.pop(element);
      }
    });
    localStorage.setItem("cachedList", JSON.stringify(temporaryList));
    router.replace(router.asPath);
  };

  return (
    <Row className={styles.rowLists}>
      <Col>
        <h2>Movie List</h2>

        <div className={styles.list}>
          {results.map((result) => {
            return (
              <MovieModal handleAdd={handleAdd}>
                <Movie key={result.imdbID} props={result} />
              </MovieModal>
            );
          })}
        </div>
        <Button disabled={disableAdd} onClick={incrementPageNumber}>
          Next
        </Button>
        <Button disabled={disableSub} onClick={decrementPageNumber}>
          Previous
        </Button>
      </Col>
      <Col>
        <h2>Watch List</h2>
        <div className={styles.list}>
          {watchList.map((result) => {
            return (
              <WatchListModal handleRemove={handleRemove}>
                <Movie key={result.imdbID} props={result} />
              </WatchListModal>
            );
          })}
        </div>
      </Col>
    </Row>
  );
};
