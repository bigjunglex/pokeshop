import { Outlet } from "react-router"
import { Header } from "./home/Header.jsx"
import { Footer } from "./home/Footer.jsx"
import { useState, useEffect, use } from "react"
import { getData, retry } from "./misc/utility.js"
import './app.css' 

const App = () => {
    const [cart, setCart] = useState({items: [], total: 0})
    const [items, setItems] = useState({items: [], isLoading: true})
    const [error, setError] = useState(null)
    
    useEffect(() => {
        try{
            const fetched = retry(getData, 5)
            setItems({items:fetched, isLoading: false})
        } catch (e) {
            setError(e)
        }
    },[])

    return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
    )
}


export { App }