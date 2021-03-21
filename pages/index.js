import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import Movie from "../components/movie";
import { MovieForm } from "../components/movieForm";
import { MainList } from "../components/mainList";
import { MovieModal } from "../components/movieModal";
// import styles from "../styles/Home.module.css";

export async function getServerSideProps(req) {
  let movieTitle = req.query.movieTitle;
  let pageNumber = req.query.pageNumber;
  let type = req.query.type;

  if (
    typeof movieTitle === "undefined" &&
    typeof pageNumber === "undefined" &&
    typeof type === "undefined"
  ) {
    console.log("UNDEFINED");
    (movieTitle = "mulan"), (pageNumber = 1), (type = "");
  }

  console.log("serverside : ", movieTitle, type, pageNumber);
  const defaultEndpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${pageNumber}&type=${type}`;
  const res = await fetch(defaultEndpoint);
  const errorCode = res.ok ? false : res.status;

  if (errorCode) {
    res.statusCode = errorCode;
  }

  console.log("RESPONSE ok? ", errorCode);
  const data = await res.json();
  return {
    props: {
      data,
      defaultEndpoint,
      errorCode,
    },
  };
}

export default function Home({ data, defaultEndpoint, errorCode }) {
  const router = useRouter();
  const { Search, Response, totalResults } = data;
  const [results, updateResults] = useState(Search);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSub, setDisableSub] = useState(true);
  const [pageNumber, updatePageNumber] = useState(1);
  const [currentHref, updateCurrentHref] = useState(defaultEndpoint);
  let currentAmount = 0;
  let response = true;

  if (Response == "False") {
    response = false;
  }
  console.log("REPONSE ", response);

  try {
    currentAmount = results.length;
  } catch (error) {
    console.log("TRY CATCH ", error);
  }

  useEffect(() => {
    if (!response) {
      updateQuery("mulan", "", 1);
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

  useEffect(() => {
    if (currentAmount < 10) {
      setDisableAdd(true);
    } else {
      setDisableAdd(false);
    }
    if (pageNumber > 1) {
      setDisableSub(false);
    } else if (pageNumber == 1) {
      setDisableSub(true);
    }
  });

  const updateQuery = (movie, type, pageNumber) => {
    console.log("Verdier i updateQuery : ", movie, type, pageNumber);
    const href = `/?movieTitle=${movie}&pageNumber=${pageNumber}&type=${type}`;

    router.push(href);
  };

  const nextPage = () => {
    console.log(
      "Nextpage: ",
      router.query.movieTitle,
      router.query.type,
      pageNumber
    );
    const href = `/?movieTitle=${router.query.movieTitle}&pageNumber=${pageNumber}&type=${router.query.type}`;

    router.push(href);
  };

  function incrementPageNumber() {
    if (currentAmount < 10) {
      return;
    } else {
      updatePageNumber(pageNumber + 1);
    }
  }

  function decrementPageNumber() {
    if (pageNumber > 1) {
      updatePageNumber(pageNumber - 1);
    } else if (pageNumber == 2) {
      updatePageNumber(pageNumber - 1);
    } else {
    }
  }

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

      <MovieForm updateQuery={updateQuery} />

      <MainList
        results={results}
        router={router}
        disableAdd={disableAdd}
        disableSub={disableSub}
        incrementPageNumber={incrementPageNumber}
        decrementPageNumber={decrementPageNumber}
      />
    </Container>
  );
}
