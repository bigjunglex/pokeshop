import { useOutletContext } from "react-router"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { trunkItems } from "../misc/utility.js"

const ItemList = ({ items }) => {
    const trunkedItems = trunkItems(items)

    return (
        <ul data-testid="item-list" className="item_list">
            {trunkedItems.map((el) => <li data-testid="listing" className="listing" key={el.id}> {el.name} <span>{el.count} {(el.weight * el.count).toFixed(2)} 🔮</span> </li>)}
        </ul>
    )
}

const Succes = () => {
    return (
        <div data-testid="success" className="success">
            <h1> ✔  Success  ✔</h1>
            <p>Something indeed happened...</p>
        </div>
    )
}

const Cart = () => {
    const [cart , setCart] = useOutletContext().cart
    const [accepted, setAccepted] = useState(false)
    const total = cart.reduce((acc, i) => acc += i.weight, 0).toFixed(2)
    const portal = document.getElementById('portal_checkout')
    
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
            {cart.length > 0 && <ItemList items={cart}/>}
            <div className="checkout_wrap">
                <h1 data-testid="cart-total">Total: {total} 🔮</h1>
                <button data-testid="checkout" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>

            {accepted && createPortal(<Succes />, portal)}
        </div>
    )
}


export { Cart }