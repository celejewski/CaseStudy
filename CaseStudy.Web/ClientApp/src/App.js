import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { CarTable } from './components/CarTable';

import './custom.css'

export const App = () => {  
    return (
      <Layout>
        <Route exact path='/' component={CarTable} />
      </Layout>
    );
}
