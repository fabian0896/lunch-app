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
  UserDetailsView,
} from './views';
import { initDb } from './services/database';
import UserDetails from './views/UserDetails';

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
          <Route exact path="/users/:id" component={UserDetails} />
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
