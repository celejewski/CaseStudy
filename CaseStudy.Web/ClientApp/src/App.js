import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CarTable } from './components/CarTable';
import { CarDetails } from './components/CarDetails';

import './custom.css'
import { ViewShoppingCart } from './components/ViewShoppingCart';

export const App = () => {  
    return (
      <Layout>
        <Route exact path='/' component={CarTable} />
        <Route exact path='/cars/:id' component={CarDetails} />
        <Route exact path='/shoppingCart/' component={ViewShoppingCart} />
      </Layout>
    );
}
