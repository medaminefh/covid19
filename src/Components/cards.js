import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import CardColumns from "react-bootstrap/CardColumns";
import axios from "axios";
import { v4 as uuid } from "uuid";
import Form from "react-bootstrap/Form";

const Cards = (props) => {
  const [latest, setLatest] = useState("");
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(true);
  const [Search, setSearch] = useState("");
  const date = new Date(latest.updated).toLocaleDateString();
  useEffect(() => {
    axios
      .all([
        axios.get("https://corona.lmao.ninja/v2/all"),
        axios.get("https://corona.lmao.ninja/v2/countries"),
      ])
      .then((res) => {
        setLatest(res[0].data);
        setResults(res[1].data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const SearchCountry = results
    ? results.filter((i) => {
        return Search !== "" ? i.country.includes(Search) : i.country;
      })
    : null;

  const countries = !loading
    ? SearchCountry.map((i) => {
        return (
          <Card
            key={uuid()}
            bg="light"
            text="dark"
            className="text-center"
            style={{ margin: 10 }}
          >
            <Card.Img variant="top" src={i.countryInfo.flag} />
            <Card.Body>
              <Card.Title>{i.country}</Card.Title>
              <Card.Text>Cases {i.cases} </Card.Text>
              <Card.Text>Deaths {i.deaths} </Card.Text>
              <Card.Text>Recovered {i.recovered} </Card.Text>
              <Card.Text>Today's Cases {i.todayCases} </Card.Text>
            </Card.Body>
          </Card>
        );
      })
    : null;

  return (
    <div>
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              <strong>{latest.cases}</strong>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>{latest ? date : null}</span>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
              <strong>{latest.deaths}</strong>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>{latest ? date : null}</span>
          </Card.Footer>
        </Card>
        <Card
          bg="primary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
              <strong>{latest.recovered}</strong>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <span>{latest ? date : null}</span>
          </Card.Footer>
        </Card>
      </CardDeck>
      <Form>
        <Form.Group controlId="formGroupSearch">
          <Form.Label>
            <h3>Search For a Country</h3>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <CardColumns>{results ? countries : <h2>Loading ...</h2>}</CardColumns>
    </div>
  );
};
export default Cards;
