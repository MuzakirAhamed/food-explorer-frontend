import axios from "axios";
import { useData } from "../context/Datacontext";

export default function Cuisines() {
  const { filterMealtype } = useData();
  async function getfilterData(value) {
    const res = await axios.get(
      `https://food-explorer-back-end-jz2q.onrender.com/filteredvalue?cuisine=${value}`
    );
    filterMealtype(res.data.data);
  }
  function handleChange(e) {
    let value = e.target.value;
    getfilterData(value);
  }
  return (
    <>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          value="North Indian"
          name="cuisine"
          onChange={handleChange}
        ></input>
        <p>North Indian</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          value="South Indian"
          name="cuisine"
          onChange={handleChange}
        ></input>
        <p>South Indian</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="cuisine"
          value="Chinese"
          onChange={handleChange}
        ></input>
        <p>Chinese</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="cuisine"
          value="Fast Food"
          onChange={handleChange}
        ></input>
        <p>Fast food</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          value="Street food"
          name="cuisine"
          onChange={handleChange}
        ></input>
        <p>Street food</p>
      </div>
    </>
  );
}
