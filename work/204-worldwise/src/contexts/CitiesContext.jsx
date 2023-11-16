import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:8000"; // json-server allows POST operation

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

/* DO NOT use async function inside React hooks */
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/got":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        currentCity: {},
        cities: state.cities.filter((c) => c.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unkown action type");
  }
}

function CitiesProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cities, isLoading, currentCity, error } = state;

  useEffect(function () {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        // setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading data...",
        });
      }
    };
    fetchCities();
  }, []);

  const getCityById = useCallback(
    async function getCityById(id) {
      /* id comes from url, which is a string */
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        // setCurrentCity(data);
        dispatch({ type: "cities/got", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "There was an error getting city...",
        });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();
      // setCities((cities) => [...cities, data]);
      dispatch({ type: "cities/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating data...",
      });
    }
  }

  async function deleteCityById(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // setCities((cities) => cities.filter((c) => c.id !== id));
      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data...",
      });
    }
  }

  const providerValue = {
    cities,
    isLoading,
    currentCity,
    error,
    getCityById,
    createCity,
    deleteCityById,
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
