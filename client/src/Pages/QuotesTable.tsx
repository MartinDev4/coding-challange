import React, { ReactNode } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@material-ui/core";

import AuthorGender from "../components/AuthorGender";

type QuoteType = {
  _id: string;
  author: string;
  quote: string;
  v: number;
  gender: string;
};

const API = axios.create({ baseURL: "http://localhost:5000" });

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const QuotesTable = () => {
  let [quotes, setQuotes] = useState([]);
  const query = useQuery();
  const limit: number = Number(query.get("limit")) || 30;

  useEffect((): void => {
    API.get(`/quotes?limit=${limit}`)
      .then((res) => {
        setQuotes(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Button color="primary" variant="contained" style={{ marginBottom: "20px" }}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/random-quote">
          Random Quote
        </Link>
      </Button>

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Quote</TableCell>
              <TableCell align="center">Author</TableCell>
              <TableCell align="center">Gender</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <>
              {quotes.length > 0
                ? quotes.map((quote: QuoteType) => (
                    <TableRow key={quote._id}>
                      <TableCell component="th" scope="row">
                        {quote._id}
                      </TableCell>
                      <TableCell align="center">{quote.quote}</TableCell>
                      <TableCell align="center">{quote.author}</TableCell>
                      <TableCell align="center">
                        <AuthorGender authorName={quote.author.split(" ")[0]} />
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default QuotesTable;
