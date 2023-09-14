import { Link } from "react-router-dom";
import { useData } from "../context/Datacontext";
import Loading from "./Loading";
export default function QuickSearch() {
  const { mealtypes, isLoading } = useData();
  if (isLoading) return <Loading />;
  return (
    <div className="sm:grid sm:grid-cols-3 mx-5">
      {mealtypes.map((item) => {
        return (
          <Link key={item._id} to={`/restaurants/filters/?mealtype=${item.meal_type}`}>
            <div className="shadow-lg shadow-stone-400 mx-3 my-2">
              <div className="flex gap-3">
                <div>
                  <img
                    src={`../${item.image}`}
                    alt={item.name}
                    className="h-40 w-52"
                  />
                </div>
                <div className="py-5">
                  <h1 className="font-semibold text-2xl">{item.name}</h1>
                  <h3 className="text-sm font-medium">{item.content}</h3>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
