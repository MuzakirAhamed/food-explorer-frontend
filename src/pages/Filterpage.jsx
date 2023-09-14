import { useEffect } from "react";
import CostforTwo from "../Components/CostforTwo";
import Cuisines from "../Components/Cuisines";
import Dropdown from "../Components/Dropdown";
import Sort from "../Components/Sort";
import { useData } from "../context/Datacontext";
import { useSearchParams } from "react-router-dom";

export default function Filterpage() {
  const { getRestaurantmealType, mealtyperestaurant } = useData();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("mealtype");
  useEffect(function () {
    getRestaurantmealType(id);
  }, []);
  
  return (
    <div className="mx-5 my-5">
      <h1 className="font-sans font-black text-blue-500 mb-5">
        Places to explore
      </h1>
      <section className="sm:flex sm:mx-10 sm:gap-4">
        <div className="shadow-lg shadow-stone-400">
          <div className="p-4 flex flex-col gap-2">
            <h1 className="font-semibold">Filters</h1>
            <p className="text-sm font-normal">Select Location</p>
            <Dropdown />
          </div>
          <div className="px-3 flex flex-col gap-1.5">
            <h1 className="font-semibold">Cuisines</h1>
            <Cuisines />
            <h1 className="font-semibold">Cost for Two</h1>
            <CostforTwo />
            <h1 className="font-semibold">Sort</h1>
            <Sort />
          </div>
        </div>
        <div className="w-full">
          {(mealtyperestaurant.length===0) ?(<h1 className="text-2xl font-semibold text-center">No Search results available now 😪</h1>):(mealtyperestaurant.map((restaurant) => {
            return (
              <div
                className="shadow-lg shadow-stone-400 mx-3 my-2"
                key={restaurant._id}
              >
                <div>
                  <div className="flex gap-3 p-4">
                    <div>
                      <img
                        src={`/${restaurant.image}`}
                        alt={restaurant.name}
                        className="h-40 w-52"
                      />
                    </div>
                    <div className="py-5">
                      <h1 className="font-semibold text-2xl">
                        {restaurant.name}
                      </h1>
                      <h3 className="text-sm font-medium">
                        {restaurant.locality} - {restaurant.city}
                      </h3>
                    </div>
                  </div>
                  <hr></hr>
                  <section className="mx-6">
                    <div className="flex py-3 space-x-7">
                      <p>CUISINES:</p>
                      <div className="flex space-x-1">
                        {restaurant.cuisine.map((item, index) => {
                          return <p key={index}>{item.name}</p>;
                        })}
                      </div>
                    </div>
                    <div className="flex space-x-7 py-3">
                      <p>COST FOR TWO:</p>
                      <p>₹{restaurant.min_price}</p>
                    </div>
                  </section>
                </div>
              </div>
            );
          }))} 
        </div>
      </section>
    </div>
  );
}
