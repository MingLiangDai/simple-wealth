import React from "react";
import { Form, Button } from "react-bootstrap";
const search = ({ receivedIntraday, receivedWeek, receivedQuote }) => {
  const search = (ticker) => {
    fetch("http://localhost:9000/stocks/intraday/" + ticker)
      .then((res) => res.json())
      .then((data) => {
        // receivedIntraday(data["Time Series (5min)"]);
        receivedIntraday(data);
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:9000/stocks/historical/" + ticker)
      .then((res) => res.json())
      .then((data) => {
        receivedWeek(data);
      })
      .catch((err) => console.error(err));
    fetch("http://localhost:9000/stocks/quote/" + ticker)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        receivedQuote(data);
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticker = e.target.search.value;
    search(ticker);
  };
  return (
    <div>
      <Form className="form-inline" onSubmit={handleSubmit}>
        <Form.Control
          name="search"
          type="text"
          placeholder="Search Ticker Symbol"
        />
        <Button variant="light">
          <i className="fas fa-search" style={{ display: "inline-block" }}></i>
        </Button>
      </Form>
    </div>
  );
};

export default search;
