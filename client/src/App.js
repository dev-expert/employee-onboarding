import React from 'react';
import './App.css';

import Routes from './routes';
import { persistor, store } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{Routes}</PersistGate>
    </Provider>
  );
}

export default App;
