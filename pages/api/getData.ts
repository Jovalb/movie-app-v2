import { NextApiRequest, NextApiResponse } from "next";

//API Route used to fetch the information from the OMDB Api
export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Creating variables from the query parameters
  const { movieTitle, type, year } = req.query;
  const pageNumber: number = +req.query.pageNumber;

  // Fetching the data from the OMDB search-api using the variables from the query params
  const defaultEndpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=${pageNumber}&type=${type}&y=${year}&apikey=740f1667`;
  const response = await fetch(defaultEndpoint);
  const data = await response.json();

  // If the fetch goes wrong and the response message says "False" we return a status 400 code with data back to the index fetch
  if (data.Response === "False") {
    res.status(400).json(data);
  } else {
    res.status(200).json(data);
  }
};
