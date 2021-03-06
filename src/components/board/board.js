import React, { useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import BalancesTab from "../balances-tab/balances-tab";
import TradeTab from "../trade-tab/trade-tab";
import "./board.css";

// d-flex flex-wrap justify-content-between
const Board = ({ userName }) => {
  const [tabs, setTabs] = useState({
    balances: true,
    positions: false,
    orders: false,
    trade: false,
  });

  const handleTabs = (tab) => {
    setTabs(
      Object.keys(tabs).reduce(
        (acc, curr) => ({ ...acc, [curr]: curr === tab }),
        {}
      )
    );
  };
  return (
    <Container fluid style={{ maxWidth: "1440px" }}>
      <Card className="shadow border-info border-bottom-0 border-top-0 border-right-0 rounded text-muted py-2 pl-2">
        <Row>
          <Col md={8} sm={12}>
            <h3 className="title">
              Welcome back <span className="text-info">{userName}</span>!
            </h3>
          </Col>
        </Row>
      </Card>
      <Card className="p-4 rounded shadow-lg mt-2">
        <Nav variant="tabs" className="mb-2">
          {Object.keys(tabs).map((tab) => {
            return (
              <Nav.Link
                style={{ cursor: "pointer" }}
                as="div"
                active={tabs[tab]}
                onClick={() => {
                  handleTabs(tab);
                }}
              >
                <h5 className="text-info">
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </h5>
              </Nav.Link>
            );
          })}
        </Nav>
        {tabs["balances"] ? (
          <BalancesTab
            handleTradeClick={() => {
              handleTabs("trade");
            }}
          />
        ) : null}
        {tabs["positions"] ? <BalancesTab /> : null}
        {tabs["orders"] ? <BalancesTab /> : null}
        {tabs["trade"] ? <TradeTab /> : null}
      </Card>
    </Container>
  );
};

export default Board;
