import {
  Button,
  Col,
  Row,
  Container,
  CardColumns,
  CardDeck,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import Movie from "./movie";
import { MovieModal, WatchListModal } from "./movieModal";
import styles from "./mainList.module.css";
import store from "store2";

export const MainList = ({
  results,
  router,
  disableAdd,
  disableSub,
  incrementPageNumber,
  decrementPageNumber,
}) => {
  // const cachedWatchList = store.session.get("cachedList");
  // const cachedWatchList = JSON.parse(localStorage.getItem("cachedList"));
  const [watchList, setWatchList] = useState(
    store.session.get("cachedList") || []
  );
  useEffect(() => {
    console.log("USE EFFECT CACHE", temporaryList);
    store.session.set("cachedList", temporaryList);
  });

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
    let alreadyAdded = false;

    results.forEach((element) => {
      if (element.imdbID === event && !alreadyAdded) {
        temporaryList.push(element);
        alreadyAdded = true;
      }
    });

    setWatchList(temporaryList);
    router.replace(router.asPath);
  };

  const handleRemove = (event) => {
    watchList.forEach((element) => {
      if (element.imdbID === event) {
        watchList.pop(element);
      }
    });

    router.replace(router.asPath);
  };

  return (
    <Container>
      <Row>
        <Col className={styles.listHeader}>
          <h2>MovieList</h2>
          <Button disabled={disableAdd} onClick={incrementPageNumber}>
            Next
          </Button>
          <Button disabled={disableSub} onClick={decrementPageNumber}>
            Prev
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardDeck className={styles.cardDeck}>
            {results.map((result) => {
              return (
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

  // return (
  //   <Row className={styles.rowLists}>
  //     <Col>
  //       <h2>Movie List</h2>

  //       <div className={styles.list}>
  //         {results.map((result) => {
  //           return (
  //             <MovieModal handleAdd={handleAdd}>
  //               <Movie key={result.imdbID} props={result} />
  //             </MovieModal>
  //           );
  //         })}
  //       </div>
  //       <Button disabled={disableAdd} onClick={incrementPageNumber}>
  //         Next
  //       </Button>
  //       <Button disabled={disableSub} onClick={decrementPageNumber}>
  //         Prev
  //       </Button>
  //     </Col>
  //     <Col>
  //       <h2>Watch List</h2>
  //       <div className={styles.list}>
  //         {watchList.map((result) => {
  //           return (
  //             <WatchListModal handleRemove={handleRemove}>
  //               <Movie key={result.imdbID} props={result} />
  //             </WatchListModal>
  //           );
  //         })}
  //       </div>
  //     </Col>
  //   </Row>
  // );
};
