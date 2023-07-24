import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HeadProvider } from 'react-head';

import App from './App';
import './index.css';
import store from './redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <HeadProvider>
          <App />
        </HeadProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
