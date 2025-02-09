import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@repo/ui/main.css";
import './index.css'
import { Provider } from "@repo/redux-store";
import { store } from "@repo/redux-store/store";
import { Toaster } from "sonner";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Toaster richColors position="top-right" />
        <App />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
