// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const movieTitle = req.query.movieTitle;
  const pageNumber = req.query.pageNumber;
  const type = req.query.type;

  // if(movieTitle === 'undefined' && pageNumber === 'undefined' && type === 'undefined'){
  //   console.log("UNDEFINED I GETDATA")
  // }

  const defaultEndpoint = `http://www.omdbapi.com/?s=${movieTitle}&page=${pageNumber}&type=${type}&apikey=740f1667`;
  const response = await fetch(defaultEndpoint);
  // const errorCode = response.ok ? false : response.statusCode;

  // if (errorCode) {
  //   console.log("Error code slår inn");
  //   res.statusCode = errorCode;
  // }
  const data = await response.json();

  if (data.Response === "False") {
    res.statusCode = 400;
  }

  console.log("YEP ", res.statusCode);
  res.status(res.statusCode).json(data);

  // console.log("RESPONSE ",data.Response);
  // console.log("RES STATUS ", res.statusCode);
};
