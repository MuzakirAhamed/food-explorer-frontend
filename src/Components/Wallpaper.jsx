import { useState } from "react";
import Dropdown from "./Dropdown";
import { useData } from "../context/Datacontext";
import { Link } from "react-router-dom";
import SignupButton from "./SignupButton";
import { useUser } from "../context/Usercontext";
import Logout from "./Logout";
export default function Wallpaper({children}) {
  const [inputvalue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { selectedRestaurant } = useData();
  const {isAuthenticated} = useUser()
  function handleChange(e) {
    setInputValue(e.target.value);
    const suggestedList = selectedRestaurant.filter((char) =>
      char.name.toLowerCase().includes(inputvalue.toLowerCase())
    );
    setSuggestions(suggestedList);
  }
  return (
    <div className="bg-hero-pattern h-[34rem] bg-center bg-cover">
      {isAuthenticated ? <Logout/> :
      <div className="space-x-5 flex justify-end p-7">
      {children}
        <SignupButton/>
      </div>}
      <div className="flex flex-col place-items-center mt-12 gap-4">
        <h1 className="text-slate-100 font-black tracking-wide text-6xl italic">
          Food Explorer
        </h1>
        <h3 className="text-slate-100 font-bold tracking-wide text-3xl mx-2">
          Find the best restaurants,cafes and bars
        </h3>
        <div className="flex gap-4 flex-wrap mx-4 items-center">
          <Dropdown />
          <input
            type="text"
            className="px-1.5 py-2 bg-slate-300 w-80 text-sm text-stone-700"
            placeholder="Please Enter Restaurant Name"
            value={inputvalue}
            onChange={(e) => handleChange(e)}
          ></input>
        </div>
        {suggestions ? (
          <ul className="border bg-slate-200 border-stone-800 relative left-28 bottom-3">
            {suggestions.map((item) => {
              return (
                <Link to={`/restaurants/details/?restaurant=${item.name}`} key={item._id}>
                  <li
                    className="px-2 py-1 border border-stone-700 cursor-pointer hover:bg-slate-300"
                  >{`${item.name} - ${item.locality},${item.city}`}</li>
                </Link>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
