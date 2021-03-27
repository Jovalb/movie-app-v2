import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Navbar } from "react-bootstrap";
import MovieForm from "../components/movieForm";
import { MainList } from "../components/mainList";
import { GetServerSideProps } from "next";

// Function for fetching props to the page using getServerSideProps
export const getServerSideProps: GetServerSideProps = async (context) => {
  // Constructing a default URL if the fetch goes wrong
  const defaultPage = "/?movieTitle=Mulan&pageNumber=1&type=&year=";
  // Variables fetched from the query being used for the fetch request to the api
  let pageNumber: number = +context.query.pageNumber;
  let { movieTitle, type, year } = context.query;

  if (isNaN(pageNumber)) {
    pageNumber = 1;
  }

  if(movieTitle == "undefined" && type == "undefined" && year == "undefined"){
    movieTitle = "mulan", type="",year=""
  }

  // Fetching to the api point at /api/getData and passing the query parameters
  const defaultEndpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${pageNumber}&type=${type}&year=${year}`;
  const res = await fetch(defaultEndpoint);

  // If the fetch return status code 400, "errorCode" will be true and redirect to the defaultPage.
  const errorCode = res.ok ? false : res.status;
  // if (errorCode) {
  //   return {
  //     redirect: {
  //       destination: defaultPage,
  //       permanent: false,
  //     },
  //   };
  // }
  // If the fetch returns status 200, it will send the props down to the index component.
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
};

//This is the index component which takes in the props from the fetch.
const Home = ({ data }) => {
  // Here all the variables and use states needed are created.

  // The router is created so we can use it to push new queries or reload the page without a complete reload of the browser.
  const router = useRouter();

  // Here the "Search" results are destrucutred from the props and the "results" use-state is sets the search results to default.
  const { Search, totalResults } = data;
  const [results, updateResults] = useState(Search);
  // Use states for disabling and enabling the next,prev buttons and for updating the page number when conditions are met.
  const [disableAdd, setDisableAdd] = useState(false);
  const [disableSub, setDisableSub] = useState(true);
  const [pageNumber, updatePageNumber] = useState(1);

  // Initializing current amount
  let currentAmount: number = 0;

  // Setting currentamount to be length of the results, if it is less than 10 we are on the last page
  try {
    currentAmount = results.length;
  } catch (error) {
    console.log("TRY CATCH CURRENT AMOUNT", error);
  }

  // USE EFFECTS

  // Use effect that triggers when search result is updated and updates the current result and page
  useEffect(() => {
    updateResults(Search);
    updatePageNumber(pageNumber);
  }, [Search]);

  // use effect that updates to next page when page number is changed
  useEffect(() => {
    nextPage();
  }, [pageNumber]);

  // use effect that enables and disables the next and prev button on mount and state changes
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
  // USE EFFECTS

  // function for updating the query of the page via the router
  const updateQuery = (
    movie: string,
    type: string,
    pageNumber: number,
    year: string
  ) => {
    const href = `/?movieTitle=${movie}&pageNumber=${pageNumber}&type=${type}&year=${year}`;

    router.push(href);
  };

  // function for updating to next page via the router
  const nextPage = () => {
    const href = `/?movieTitle=${router.query.movieTitle}&pageNumber=${pageNumber}&type=${router.query.type}&year=${router.query.year}`;
    router.push(href);
  };

  // function for incrementing the state of page number
  const incrementPageNumber = () => {
    if (currentAmount < 10) {
      return;
    } else {
      updatePageNumber(pageNumber + 1);
    }
  };

  // function for decrementing the state of page number
  const decrementPageNumber = () => {
    if (pageNumber > 1) {
      updatePageNumber(pageNumber - 1);
    } else if (pageNumber == 2) {
      updatePageNumber(pageNumber - 1);
    } else {
    }
  };

  return (
    // Here I used bootstrap to make the setup easier and more responsive
    // @ts-ignore
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

      {/* updateQuery is passed to the movieForm where we can use it to update the query */}
      <MovieForm updateQuery={updateQuery} />

      {/* Results is passed to the lists together with functions for page buttons and router for refreshing data */}
      <MainList
        totalResults={totalResults}
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
