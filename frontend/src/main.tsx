import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
    RouterProvider,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "./layout/MainLayout.tsx";
import { PopupProvider } from "./context/PopupContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "react-query";
import AuthCheck from "./component/single/AuthCheck.tsx";
import VerifyPage from "./pages/VerifyPage.tsx";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
            <Route path="/auth" element={<AuthCheck />}>
                <Route index element={<VerifyPage />} />
            </Route>
        </Route>
    )
);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <PopupProvider>
                <RouterProvider router={router} />
                <ToastContainer />
            </PopupProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
