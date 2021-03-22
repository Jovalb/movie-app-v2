import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Col, Container, Navbar, Row } from "react-bootstrap";
import Movie from "../components/movie";
import MovieForm from "../components/movieForm";
import { MainList } from "../components/mainList";
import { MovieModal } from "../components/movieModal";
import { GetServerSideProps } from "next";
// import styles from "../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const defaultPage = "/?movieTitle=Mulan&pageNumber=1&type=&year=";
  let pageNumber: number = +context.query.pageNumber;
  let { movieTitle, type, year } = context.query;

  if (isNaN(pageNumber)) {
    pageNumber = 1;
  }

  console.log("serverside : ", movieTitle, type, pageNumber, year);
  const defaultEndpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${pageNumber}&type=${type}&year=${year}`;
  const res = await fetch(defaultEndpoint);
  const errorCode = res.ok ? false : res.status;

  if (errorCode) {
    return {
      redirect: {
        destination: defaultPage,
        permanent: false,
      },
    };
  }
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

const Home = ({ data }) => {
  const router = useRouter();
  const { Search, Response, totalResults } = data;
  const [results, updateResults] = useState(Search);
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSub, setDisableSub] = useState(true);
  const [pageNumber, updatePageNumber] = useState(1);
  let currentAmount: number = 0;
  let response: boolean = true;

  // if (Response == "False") {
  //   response = false;
  // }

  try {
    currentAmount = results.length;
  } catch (error) {
    console.log("TRY CATCH ", error);
  }

  useEffect(() => {
    updateResults(Search);
    updatePageNumber(pageNumber);
  }, [Search, response]);

  useEffect(() => {
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

  const updateQuery = (
    movie: string,
    type: string,
    pageNumber: number,
    year: string
  ) => {
    console.log("Verdier i updateQuery : ", movie, type, pageNumber, year);
    const href = `/?movieTitle=${movie}&pageNumber=${pageNumber}&type=${type}&year=${year}`;

    router.push(href);
  };

  const nextPage = () => {
    const href = `/?movieTitle=${router.query.movieTitle}&pageNumber=${pageNumber}&type=${router.query.type}&year=${router.query.year}`;
    router.push(href);
  };

  const incrementPageNumber = () => {
    if (currentAmount < 10) {
      return;
    } else {
      updatePageNumber(pageNumber + 1);
    }
  };

  const decrementPageNumber = () => {
    if (pageNumber > 1) {
      updatePageNumber(pageNumber - 1);
    } else if (pageNumber == 2) {
      updatePageNumber(pageNumber - 1);
    } else {
    }
  };

  return (
    <Container fluid="true">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Movie Search</title>
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
        incrementPageNumber={() => incrementPageNumber()}
        decrementPageNumber={() => decrementPageNumber()}
      />
    </Container>
  );
};

export default Home;
