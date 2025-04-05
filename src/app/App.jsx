import { Outlet } from "react-router"
import { Header } from "./home/Header.jsx"
import { Footer } from "./home/Footer.jsx"
import { useState, useEffect, use } from "react"
import { getData } from "./misc/utility.js"
import './app.css' 


const App = () => {
    const [cart, setCart] = useState([])
    const [items, setItems] = useState({items: [], isLoading: true})
    const [error, setError] = useState(null)
    const [cartLoaded, setCartLoaded] = useState(false)
    
    //cart info interaction with local storage
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('cart'))
        if (stored && !cartLoaded) {
            setCart(stored)
            setCartLoaded(true)
        } else {
            const current = JSON.stringify(cart)
            localStorage.setItem('cart',current)
        }
    },[cart])
    
    //shop info fetch + interaction with session storage
    useEffect(() => {
        // base fetch logic
        const stored = JSON.parse(sessionStorage.getItem('items'))
        if(stored){
            setItems({items:stored, isLoading: false})
        } else {
            getData(15)
            .then((value) => {
                if(value){   
                    setItems({items:value, isLoading:false})
                    sessionStorage.setItem('items', JSON.stringify(value))
                }
            })
            .catch(e => setError(e))
        }
    },[])

    return (
    <>
        <Header amount={cart.length} />
        <Outlet context={{shop: items, cart: [cart, setCart]}} />
        <Footer />
    </>
    )
}


export { App }