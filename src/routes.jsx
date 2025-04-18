import { Home } from "./app/home/Home.jsx"
import { Error } from "./app/misc/Error.jsx"
import { Cart } from "./app/shop/Cart.jsx"
import { Shop } from "./app/shop/Shop.jsx"
import { App } from "./app/App.jsx"


const appRoutes = [
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "shop",
                element: <Shop />,
            },
            {
                path: "cart",
                element: <Cart />,
            },
        ]
    },
]



export { appRoutes }