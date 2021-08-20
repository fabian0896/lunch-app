import React, { useEffect, useState } from 'react';
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const setupConfiguration = async () => {
    await initDb();
    setLoading(false);
  };

  useEffect(() => {
    setupConfiguration();
  }, []);

  if (loading) {
    return <div>Cargando base de datos...</div>;
  }

  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/orders" component={OrdersView} />
          <Route exact path="/products" component={ProductsView} />
          <Route exact path="/users/:id" component={UserDetailsView} />
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
