import React, { Component } from 'react';
import axios from 'axios';
import { Card, Row, Col, Button, Image } from 'react-bootstrap';

class PersonList extends Component {
  // Define state default values
  state = {
    persons: [],
    loading: true,
    error: null,
  };

  // Component Lifecycle Callback
  componentDidMount() {
    axios
      .get('https://randomuser.me/api/?results=10')
      .then((res) => {
        console.log(res.data);
        const persons = res.data.results;
        this.setState({ persons, loading: false });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ error: 'Could not load users.', loading: false });
      });
  }

  // one label + value line inside a card
  renderRow(label, value) {
    return (
      <Row className="mb-3">
        <Col sm={3} className="text-sm-end">
          {label}
        </Col>
        <Col sm={9}>{value}</Col>
      </Row>
    );
  }

  render() {
    const { persons, loading, error } = this.state;

    return (
      <div>
        <h1 className="bg-success text-center p-3">User List</h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        {persons.map((person) => {
          const loc = person.location;
          const address =
            loc.street.number + ' ' + loc.street.name + ', ' + loc.city + ', ' +
            loc.state + ', ' + loc.country + ' - ' + loc.postcode;

          return (
            <Card key={person.login.uuid} bg="info" className="m-3">
              <Card.Header>
                <b>
                  {person.name.title} {person.name.first} {person.name.last} -{' '}
                  {person.login.uuid}
                </b>
              </Card.Header>

              <Card.Body>
                <Row>
                  <Col md={2} className="text-center">
                    <Image
                      src={person.picture.large}
                      alt={person.name.first}
                      roundedCircle
                      fluid
                    />
                    <div>
                      <Button variant="primary" className="mt-3">
                        Details
                      </Button>
                    </div>
                  </Col>

                  <Col md={10}>
                    {this.renderRow('User Name:', <h5>{person.login.username}</h5>)}
                    {this.renderRow('Gender:', person.gender.toUpperCase())}
                    {this.renderRow('Time Zone Description:', loc.timezone.description)}
                    {this.renderRow('Address:', address)}
                    {this.renderRow('Email:', person.email)}
                    {this.renderRow(
                      'Birth Date and Age:',
                      person.dob.date + ' (' + person.dob.age + ')'
                    )}
                    {this.renderRow('Register Date:', person.registered.date)}
                    {this.renderRow('Phone#:', person.phone)}
                    {this.renderRow('Cell#:', person.cell)}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    );
  }
}

export default PersonList;
