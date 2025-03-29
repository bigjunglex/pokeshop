import { Outlet } from "react-router"
import { Header } from "./home/Header.jsx"
import { Footer } from "./home/Footer.jsx"
import { useState, useEffect, use } from "react"
import { getData, retry } from "./misc/utility.js"
import './app.css' 
import { dummyItems} from "./misc/dummy.js"

const App = () => {
    const [cart, setCart] = useState([])
    const [items, setItems] = useState({items: [], isLoading: true})
    const [error, setError] = useState(null)
    
    useEffect(() => {
        //dummy data intercepts fetch
        sessionStorage.setItem('items', dummyItems)

        // base fetch logic
        const stored = JSON.parse(sessionStorage.getItem('items'))
        if(stored){
            setItems({items:stored, isLoading: false})
        } else {
            retry(getData, 5)
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
        <Header />
        <Outlet context={{shop: items, cart: [cart, setCart]}} />
        <Footer />
    </>
    )
}


export { App }