// Functions for handling the validation of the search input

// Main function that combines all validations to validate a complete search with filter
const validateSearch = async (
  movieTitle: string,
  type: string,
  year: string
) => {
  if (!(await validateMovieTitle(movieTitle))) {
    alert("Could not find results for : " + movieTitle);
    return false;
  } else if (!(await validateType(movieTitle, type))) {
    alert("Could not find results of type : " + type);
    return false;
  } else if (!(await validateYear(movieTitle, type, year))) {
    alert("Could not find results for year : " + year);
    return false;
  } else {
    return true;
  }
};

// Function for validation of the year taken from movieForm
const validateYear = async (movieTitle: string, type: string, year: string) => {
  // The validation is tested by using the fetch function and testing the respone
  const endpoint = `http://localhost:3000/api/getData?movieTitle=${movieTitle}&pageNumber=${1}&type=${type}&year=${year}`;
  const res = await fetch(endpoint);
  const data = await res.json();

  if (data.Response === "False") {
    return false;
  } else {
    return true;
  }
};

// Function for validation of the movie title taken from movieForm
const validateMovieTitle = async (movieTitle: string) => {
  const endpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=1&&apikey=740f1667`;
  const res = await fetch(endpoint);
  const data = await res.json();
  if (data.Response === "False") {
    return false;
  } else {
    return true;
  }
};

// Validation of the chosen movie type taken from movieForm
const validateType = async (movieTitle: string, type: string) => {
  const endpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=1&type=${type}&apikey=740f1667`;
  const res = await fetch(endpoint);
  const data = await res.json();
  if (data.Response === "False") {
    return false;
  } else {
    return true;
  }
};

export default validateSearch;
