import { createContext, useContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000"; // json-server allows POST operation
o;
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

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

  async function getCityById(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      console.log("create city:", data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  const providerValue = {
    cities,
    isLoading,
    currentCity,
    getCityById,
    createCity,
  };

  return (
    <CitiesContext.Provider value={providerValue}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("ERROR: Context was used OUTSIDE the Provider");
  }
  return context;
}

export { CitiesProvider, useCities };
