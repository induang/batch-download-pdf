import { configureStore } from "@reduxjs/toolkit";

import { counterSlice, COUTER_SLICE_NAME } from "./slices/counter";

const store = configureStore({
  reducer: {
    [COUTER_SLICE_NAME]: counterSlice.reducer,
  },
});

export default store;
