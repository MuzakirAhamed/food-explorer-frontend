import axios from "axios";
import { useData } from "../context/Datacontext";

export default function CostforTwo() {
  const { filterMealtype } = useData();
  async function getMinPriceRestaurants({lcost, hcost}) {
    const res = await axios.get(
      `https://food-explorer-back-end-jz2q.onrender.com/filteredValue?lcost=${lcost}&hcost=${hcost}`
    );
    filterMealtype(res.data.data);
  }
  function handleChange(e) {
    const { value } = e.target;
    const [lcost, hcost] = value.split(",");
    getMinPriceRestaurants({ lcost, hcost });
  }
  return (
    <>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="priceGroup"
          value="0,500"
          onChange={handleChange}
        ></input>
        <p>Less than ₹500 </p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="priceGroup"
          value="500,1000"
          onChange={handleChange}
        ></input>
        <p>₹500 to ₹1000</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="priceGroup"
          value="1000,1500"
          onChange={handleChange}
        ></input>
        <p>₹1000 to ₹1500</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="priceGroup"
          value="1500,2000"
          onChange={handleChange}
        ></input>
        <p>₹1500 to ₹2000</p>
      </div>
      <div className="flex gap-2 mx-3">
        <input
          type="radio"
          name="priceGroup"
          value="2000,3000"
          onChange={handleChange}
        ></input>
        <p>₹2000+</p>
      </div>
    </>
  );
}
