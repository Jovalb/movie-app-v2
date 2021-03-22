// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { movieTitle, type, year } = req.query;
  const pageNumber: number = +req.query.pageNumber;
  console.log("variabler i getdata : ", year);

  const defaultEndpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=${pageNumber}&type=${type}&y=${year}&apikey=740f1667`;
  const response = await fetch(defaultEndpoint);

  const data = await response.json();

  if (data.Response === "False") {
    res.status(400).json(data);
  } else {
    console.log("Data fra getData : ", data);
    res.status(200).json(data);
  }
};
