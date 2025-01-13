// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { persistor } from "./store/store.ts";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ErrorBoundary>
                            <QueryClientProvider client={queryClient}>
                                <ReactQueryDevtools initialIsOpen={false} />
                                <App />
                            </QueryClientProvider>
                        </ErrorBoundary>
                    </PersistGate>
                </Provider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    // </StrictMode>
);
