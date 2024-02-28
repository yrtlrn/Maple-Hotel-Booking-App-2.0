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

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<App />} />
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <PopupProvider>
            <RouterProvider router={router} />
        </PopupProvider>
    </React.StrictMode>
);
