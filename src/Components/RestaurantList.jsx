import { Link } from "react-router-dom";


export default function RestaurantList() {
  return (
    <div className="sm:flex my-5 sm:justify-around flex flex-wrap">
        <Link to={`/restaurants/details/?restaurant=KFC`}>
            <img src="/Assets/kfc.jpg" alt="kfc" className="h-48 cursor-pointer hover:shadow-xl hover:shadow-stone-500/50"/>
        </Link>
        <Link to={`/restaurants/details/?restaurant=Baba%20KaDhaba`}>
            <img src="/Assets/baba_kadhaba.jpg" alt="baba_kadhaba" className="h-48 cursor-pointer hover:shadow-xl hover:shadow-stone-500/50"/>
        </Link>
        <Link to={`/restaurants/details/?restaurant=BurgerKing`}>
            <img src="/Assets/burgerking.jpg" alt="burgerking" className="h-48 cursor-pointer hover:shadow-xl hover:shadow-stone-500/50"/>
        </Link>
        <Link to={`/restaurants/details/?restaurant=Domino%27s`}>
            <img src="/Assets/dominos.jpg" alt="dominos" className="h-48 cursor-pointer hover:shadow-xl hover:shadow-stone-500/50"/>
        </Link>
    </div>
  )
}
