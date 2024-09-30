import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { GoogleOAuthProvider } from "@react-oauth/google";

;

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <Provider store={store}>
                    {/* <PersistGate loading={null} persistor={persistor}> */}
                    <App />
                    {/* </PersistGate> */}
                </Provider>
            </GoogleOAuthProvider>
        </BrowserRouter>
    </StrictMode>
);
