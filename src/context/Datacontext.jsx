import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [mealtypes, setMealtypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [restaurantdetails, setRestaurantdetails] = useState([]);
  const [mealtyperestaurant, setMealtyperestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchMealtype() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://food-explorer-back-end-jz2q.onrender.com/mealtypes"
        );
        setMealtypes(res.data.data);
        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }
    fetchMealtype();
  }, []);
  useEffect(function () {
    async function fetchLocation() {
      try {
        const res = await axios.get(
          "https://food-explorer-back-end-jz2q.onrender.com/locations"
        );
        setLocations(res.data.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchLocation();
  }, []);
  async function getRestaurant(id) {
    try {
      const result = await axios.get(
        `https://food-explorer-back-end-jz2q.onrender.com/restaurants/${id}`
      );
      setSelectedRestaurant(result.data.data);
    } catch (error) {
      alert(error);
    }
  }
  async function getRestaurantdetails(name) {
    try {
      const result = await axios.get(
        `https://food-explorer-back-end-jz2q.onrender.com/restaurantdetails/?restaurant=${name}`
      );
      setRestaurantdetails(result.data.data);
    } catch (error) {
      alert(error);
    }
  }
  async function getRestaurantmealType(id) {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `https://food-explorer-back-end-jz2q.onrender.com/mealtyperestaurant/?mealtype=${id}`
      );
      setMealtyperestaurant(result.data.data);
      setIsLoading(false);
    } catch (error) {
      alert(error);
    }
  }
  function filterMealtype(value) {
    setMealtyperestaurant(value);
  }
  return (
    <DataContext.Provider
      value={{
        mealtypes,
        isLoading,
        locations,
        getRestaurant,
        selectedRestaurant,
        getRestaurantdetails,
        restaurantdetails,
        getRestaurantmealType,
        mealtyperestaurant,
        filterMealtype,
        setMealtyperestaurant,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
function useData() {
  const context = useContext(DataContext);
  return context;
}
export { DataProvider, useData };
