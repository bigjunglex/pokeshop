import { useOutletContext } from "react-router"
import { useEffect, useState } from "react"
import { trunkItems } from "../misc/utility.js"

const ItemList = ({ items }) => {
    const trunkedItems = trunkItems(items)

    return (
        <ul data-testid="item-list" className="item_list">
            {trunkedItems.map((el) => <li data-testid="listing" className="listing" key={el.id}> {el.title} <span>{el.count} {(el.price * el.count).toFixed(2)} 🔮</span> </li>)}
        </ul>
    )
}

const Succes = () => {
    return (
        <div data-testid="success" className="success">
            <h1> ✔  Success  ✔</h1>
        </div>
    )
}

const Cart = () => {
    const [cart , setCart] = useOutletContext().cart
    const [accepted, setAccepted] = useState(false)
    const total = cart.reduce((acc, i) => acc += i.price, 0).toFixed(2)

    useEffect(() => {
        if(accepted){
            setTimeout(() => setAccepted(false),1300)
        }
    },[accepted])

    const handleCheckout = () => {
        if(cart.length > 0){
            setAccepted(true)
            setCart([])
        }
    }

    return (
        <div className="cart_wrapper">
            <ItemList items={cart}/>
            <div className="checkout_wrap">
                <h1 data-testid="cart-total">Total: {total} 🔮</h1>
                <button data-testid="checkout" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>

            {accepted && <Succes />}
        </div>
    )
}


export { Cart }