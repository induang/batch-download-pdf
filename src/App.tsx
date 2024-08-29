import "./App.css";

import { queryClient } from "@queries/index";
import { store } from "@redux/index";
import router from "@router/index";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { WebworkerProvider } from "./contexts/WebworkerProvider";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WebworkerProvider>
          <RouterProvider router={router} />
        </WebworkerProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
