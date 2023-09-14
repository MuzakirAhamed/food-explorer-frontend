import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
const Homepage = lazy(() => import("./pages/Homepage"));
const DetailsPage = lazy(() => import("./pages/Detailspage"));
const Filterpage = lazy(() => import("./pages/Filterpage"));
const PageNotfound = lazy(() => import("./pages/PageNotfound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
// import Homepage from "./pages/Homepage";
// import DetailsPage from "./pages/Detailspage";
// import Filterpage from "./pages/Filterpage";
// import PageNotfound from "./pages/PageNotfound";
// import AppLayout from "./pages/AppLayout";
import { DataProvider } from "./context/Datacontext";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "./context/Usercontext";
import Spinner from "./Components/Spinner";

export default function App() {
  return (
    <DataProvider>
      <UserProvider>
        <BrowserRouter>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Homepage />}></Route>
              <Route path="/restaurants" element={<AppLayout />}>
                <Route index element={<DetailsPage />} />
                <Route path="details" element={<DetailsPage />} />
                <Route path="filters" element={<Filterpage />} />
              </Route>
              <Route path="*" element={<PageNotfound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "1rem",
              maxWidth: "500px",
            },
          }}
        />
      </UserProvider>
    </DataProvider>
  );
}
