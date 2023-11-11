import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";

const BASE_URL = "http://localhost:8000";

function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("There was an error loading data...");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <>
      <h3>Hello React Router</h3>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="product" element={<Product />}></Route>
          <Route path="pricing" element={<Pricing />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="app" element={<AppLayout />}>
            <Route
              index
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route
              path="cities"
              element={<CityList cities={cities} isLoading={isLoading} />}
            ></Route>

            {/* name the param as id*/}
            <Route path="cities/:id" element={<City />}></Route>

            <Route
              path="countries"
              element={<CountryList cities={cities} isLoading={isLoading} />}
            ></Route>
            <Route path="form" element={<p>Form</p>}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
