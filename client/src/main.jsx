import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HeadProvider } from 'react-head';

import App from './App';
import './index.css';
import store from './redux/store';
import AuthProvider from './context/AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <HeadProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HeadProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
)
