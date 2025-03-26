import { Outlet } from "react-router"
import { Header } from "./home/Header.jsx"
import { Footer } from "./home/Footer.jsx"
import { useState, useEffect } from "react"
import { getData } from "./misc/utility.js"
import './app.css' 

const App = () => {
    const [cart, setCart] = useState({items: [], total: 0})
    const [items, setItems] = useState({items: [], isLoading: true})

    useEffect(() => {
        const fetched = getData()
        setItems({items:fetched, isLoading: false})
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