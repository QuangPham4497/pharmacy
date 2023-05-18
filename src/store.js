import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./redux/sagas";

import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import authReducer from "./redux/reducers/auth.reducer";
import reviewReducer from "./redux/reducers/review.reducer";
import cartReducer from "./redux/reducers/cart.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import orderReducer from "./redux/reducers/order.reducer";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    review: reviewReducer,
    cart: cartReducer,
    location: locationReducer,
    order: orderReducer,
  },

  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export { store };
