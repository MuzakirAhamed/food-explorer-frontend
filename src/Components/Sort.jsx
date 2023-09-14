import axios from "axios";
import { useData } from "../context/Datacontext";
export default function Sort() {
  const { filterMealtype } = useData();
  async function getSorted(sortOrder) {
    if (sortOrder === 1) {
      const res = await axios.get(
        `https://food-explorer-back-end-jz2q.onrender.com/filteredValue?sort=min_price`
      );
      filterMealtype(res.data.data);
    } else if (sortOrder === -1) {
      const res = await axios.get(
        `https://food-explorer-back-end-jz2q.onrender.com/filteredValue?sort=-min_price`
      );
      filterMealtype(res.data.data);
    }
  }
  function handleChange(e) {
    let { value } = e.target;
    value *= 1;
    getSorted(value);
  }
  return (
    <>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="sorting"
          value={1}
          onChange={handleChange}
        ></input>
        <p>Price low to high</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="sorting"
          value={-1}
          onChange={handleChange}
        ></input>
        <p>Price high to low</p>
      </div>
    </>
  );
}
