import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import { Container } from 'semantic-ui-react';
import { CompanyForm } from './components';

const Hello = () => {
  return (
    <Container>
      <CompanyForm />
    </Container>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
