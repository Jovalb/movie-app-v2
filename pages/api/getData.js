// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const movieTitle = req.query.movieTitle;
  const pageNumber = req.query.pageNumber;

  const defaultEndpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=${pageNumber}&apikey=740f1667`
  const response = await fetch(defaultEndpoint);
  const data = await response.json();
  res.status(200).json(data)
}
