import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

/*
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
*/
/*
dist/assets/index-59164d5b.css   31.32 kB │ gzip:   5.23 kB
dist/assets/index-9808272c.js   528.30 kB │ gzip: 149.73 kB
*/

/* lazy loading pages and <Suspense/> */
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Homepage = lazy(() => import("./pages/Homepage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
/*
dist/assets/Product-c7354701.js           0.86 kB │ gzip:   0.49 kB
dist/assets/Login-5e19ae4e.js             1.01 kB │ gzip:   0.53 kB
dist/assets/AppLayout-7ffd996e.js       156.94 kB │ gzip:  46.14 kB
dist/assets/index-f9674b5d.js           369.74 kB │ gzip: 103.11 kB
*/

function App() {
  return (
    <>
      <CitiesProvider>
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<Homepage />}></Route>
                <Route path="product" element={<Product />}></Route>
                <Route path="pricing" element={<Pricing />}></Route>
                <Route path="login" element={<Login />}></Route>
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  {
                    <Route
                      index
                      element={<Navigate replace to="cities" />}
                    ></Route>
                  }
                  <Route path="cities" element={<CityList />}></Route>
                  <Route path="cities/:id" element={<City />}></Route>
                  <Route path="countries" element={<CountryList />}></Route>
                  <Route path="form" element={<Form />}></Route>
                </Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CitiesProvider>
    </>
  );
}

export default App;
