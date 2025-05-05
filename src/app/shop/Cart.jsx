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

const Succes = ({ duration }) => {
    const [barWidth, setBarWidth] = useState(100)

    useEffect(() => {
        const start = Date.now()
        const loop = () => {
            const elapsed = Date.now() - start
            const percent = Math.max(0, 100 - (elapsed / duration) * 100)
            setBarWidth(percent)
        
            if(percent > 0) {
                requestAnimationFrame(loop)
            }
        }

        requestAnimationFrame(loop)
    
    },[])


    return (
        <div data-testid="success" className="success">
            <h1> ✔  Success  ✔</h1>
            <p>Something indeed happened...</p>
            <div
                className="success_progress"
                style={{width: `${barWidth}%`}}
            />
        </div>
    )
}

const Cart = () => {
    const [cart , setCart] = useOutletContext().cart
    const [accepted, setAccepted] = useState(false)
    const total = cart.reduce((acc, i) => acc += i.weight, 0).toFixed(2)
    const portal = document.getElementById('portal_checkout')
    
    const duration = 1300

    useEffect(() => {
        if(accepted){
            setTimeout(() => setAccepted(false),duration)
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

            {accepted && createPortal(<Succes duration={duration} />, portal)}
        </div>
    )
}


export { Cart }