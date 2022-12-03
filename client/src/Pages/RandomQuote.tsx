import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

const API = axios.create({ baseURL: "http://localhost:5000" });

const RandomQuote = () => {
  let [quote, setQuote] = useState({
    quote: "",
    author: "",
  });

  const fetchNewRandomQuote = (): void => {
    API.get(`/quotes/random-quote`)
      .then((res) => {
        setQuote(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  useEffect((): void => {
    fetchNewRandomQuote();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>"{quote && quote.quote}"</h1>
      <h2 style={{ textAlign: "center" }}>-{quote && quote.author}</h2>
      <Grid container justifyContent="center">
        <Button color="primary" variant="contained" size="large" style={{ marginTop: "5%", marginRight: "10px" }}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/quotes">
            Go Back
          </Link>
        </Button>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          style={{ marginTop: "5%" }}
          onClick={fetchNewRandomQuote}
        >
          New Random Quote
        </Button>
      </Grid>
    </>
  );
};

export default RandomQuote;
