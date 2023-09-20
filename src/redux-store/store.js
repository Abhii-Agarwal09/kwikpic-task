import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { auth, user, groups, settings, analytics } from "./slices";

const sagaMiddleware = createSagaMiddleware({ serializableCheck: false });

// All middlewares need to be passed in this array.
const middlewares = [sagaMiddleware];

const store = configureStore({
  reducer: {
    auth,
    user,
    groups,
    settings,
    analytics,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([...middlewares]),
});

sagaMiddleware.run(rootSaga);
export { store };
