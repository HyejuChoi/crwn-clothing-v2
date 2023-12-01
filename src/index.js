import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { UserProvider } from './contexts/user.context';
import { ProductProvider } from './contexts/products.context'

import './index.scss';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductProvider>
        <UserProvider>        
          <App />
        </UserProvider>
      </ProductProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
