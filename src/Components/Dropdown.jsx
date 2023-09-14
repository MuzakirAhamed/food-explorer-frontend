import { useData } from "../context/Datacontext";
export default function Dropdown() {
  const { locations, getRestaurant } = useData();
  function handleClick(e) {
    getRestaurant(e.target.value);
  }
  return (
    <div>
      <select
        className="bg-slate-200 py-2 w-56"
        onChange={(e) => handleClick(e)}
      >
        <option disabled>Select a restaurant</option>
        {locations.map((item) => {
          return (
            <option value={item.location_id} key={item._id}>
              {item.name}, {item.city}
            </option>
          );
        })}
      </select>
    </div>
  );
}
