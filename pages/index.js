import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import Movie from "../components/movie";
import { MovieForm } from "../components/movieForm";
import { MainList } from "../components/mainList";
// import styles from "../styles/Home.module.css";

export async function getServerSideProps(req, res) {
  const movieTitle = req.query.movieTitle;
  const pageNumber = req.query.pageNumber;

  console.log("serverside : ", movieTitle, pageNumber);
  const defaultEndpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${pageNumber}`;
  // const defaultEndpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=${page}&apikey=740f1667`;
  res = await fetch(defaultEndpoint);
  const data = await res.json();
  console.log("Her er data serverside ", data);
  return {
    props: {
      data,
      defaultEndpoint,
    },
  };
}

export default function Home({ data, defaultEndpoint }) {
  console.log("Her er data", data);
  const router = useRouter();
  const { Search, Response, totalResults } = data;
  const [results, updateResults] = useState(Search);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSub, setDisableSub] = useState(true);
  let currentAmount = 0;
  let response = true;

  if (Response == "False") {
    console.log("Response false! Results set to empty");
    response = false;
  }

  try {
    currentAmount = results.length;
  } catch (error) {
    console.log("TRY CATCH ", error);
  }

  console.log("Defaultresult ", results);
  console.log("Current amount : ", currentAmount);

  // const { pathname, query } = router;
  console.log(
    "Search : ",
    Search,
    " Results : ",
    results,
    " Response : ",
    Response,
    " Total results : ",
    totalResults,
    " Pathname : ",
    router.pathname,
    " Query : ",
    router.query
  );
  const [pageNumber, updatePageNumber] = useState(1);
  const [movieTitle, updateMovieTitle] = useState(router.query.movieTitle);
  const [currentHref, updateCurrentHref] = useState(defaultEndpoint);
  console.log("Defaultendpoint ", defaultEndpoint);
  console.log("Current href", currentHref);

  const updateQuery = (movie, pageNumber) => {
    console.log("Verdier i updateQuery : ", movie, pageNumber);
    const href = `/?movieTitle=${movie}&pageNumber=${pageNumber}`;

    router.push(href);
  };

  const nextPage = () => {
    console.log("Nextpage: ", router.query.movieTitle, pageNumber);
    const href = `/?movieTitle=${router.query.movieTitle}&pageNumber=${pageNumber}`;

    router.push(href);
  };

  function incrementPageNumber() {
    if (currentAmount < 10) {
      setDisableAdd(true);
      return;
    } else {
      updatePageNumber(pageNumber + 1);
      setDisableSub(false);
    }
  }

  function decrementPageNumber() {
    if (pageNumber > 1) {
      if (disableAdd) {
        setDisableAdd(false);
      }
      updatePageNumber(pageNumber - 1);
    } else if (pageNumber == 2) {
      updatePageNumber(pageNumber - 1);
      setDisableSub(true);
    } else {
      setDisableSub(true);
    }
  }

  useEffect(() => {
    if (!response) {
      return;
    }
    console.log("USE EFFECT RESULTS");
    updateResults(Search);
    updatePageNumber(parseInt(router.query.pageNumber));
  }, [Search, response]);

  useEffect(() => {
    console.log("USE EFFECT NEXTPAGE");
    nextPage();
  }, [pageNumber]);

  return (
    <Container fluid="true">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar bg="dark" variant="dark" className="justify-content-center">
        <Navbar.Brand>
          <h2>Movie-Search</h2>
        </Navbar.Brand>
      </Navbar>
      <Row class="margin: auto">
        <Col>
          <MovieForm updateQuery={updateQuery} />
        </Col>
      </Row>
      <Button disabled={disableAdd} onClick={incrementPageNumber}>
        Next
      </Button>
      <Button disabled={disableSub} onClick={decrementPageNumber}>
        Previous
      </Button>
      <Row>
        <Col>
          {results.map((result) => {
            return <Movie key={result.imdbID} props={result} />;
          })}
        </Col>
        <Col>
          {results.map((result) => {
            return <Movie key={result.imdbID} props={result} />;
          })}
        </Col>
      </Row>
    </Container>
  );
}