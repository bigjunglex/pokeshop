import { Home } from "./app/home/Home.jsx"
import { Error } from "./app/misc/Error.jsx"
import { Cart } from "./app/shop/Cart.jsx"
import { Item } from "./app/shop/Item.jsx"
import { Shop } from "./app/shop/Shop.jsx"


const routes = [
    {
        path: "/",
        element: <Home/>,
        errorElement: <Error />
    },
    {
        path: "shop",
        element: <Shop />,
    },
    {
        path: "cart",
        element: <Cart />,
    },
    {
        path: "item",
        element: <Item />
    }
]



export { routes }