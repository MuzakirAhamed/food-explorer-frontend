import Wallpaper from "../Components/Wallpaper";
import QuickSearch from "../Components/QuickSearch";
import RestaurantList from "../Components/RestaurantList";
import Login from "../Components/Login";

export default function Homepage() {
 
  return (
    <div>
      <Wallpaper >
        <Login/>
      </Wallpaper>
      <RestaurantList/>
      <div className="mx-8 my-5">
        <h1 className="text-4xl font-black font-serif">Quick Searches</h1>
        <h4 className="text-md font-medium">
          Discover restaurants by meal type
        </h4>
      </div>
      <QuickSearch/>
    </div>
  );
}
