import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.global.css';
import { Layout } from './containers';
import {
  HomeView,
  UsersView,
  ProductsView,
  OrdersView,
  CompaniesView,
} from './views';
import { initDb } from './services/database';

export default function App() {
  const setupConfiguration = async () => {
    await initDb();
  };

  useEffect(() => {
    setupConfiguration();
  }, []);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/orders" component={OrdersView} />
          <Route exact path="/products" component={ProductsView} />
          <Route exact path="/users" component={UsersView} />
          <Route exact path="/companies" component={CompaniesView} />
          <Route exact path="/" component={HomeView} />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}
