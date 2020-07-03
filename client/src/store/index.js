import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default function configureStore() {
  let store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  let persistor = persistStore(store);

  return { persistor, store };
}

export const { persistor, store } = configureStore();
