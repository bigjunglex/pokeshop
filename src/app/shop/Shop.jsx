import { useOutletContext} from "react-router"
import { useState, useEffect } from "react"
import { Loader } from "../misc/Loader.jsx"
import { formatDesc } from "../misc/utility.js"
import { getData } from "../misc/utility.js"


const Card = ({ item, toCart }) => {
    const [input, setInput] = useState(1)
    const btnStatus = input <= 10

    const handleChange = (e) => setInput(e.target.value)
    const handleToCart = (item, amount) => {
        const newItems = []
        for (let i = 0; i < amount; i++){
            newItems.push(item)
        }
        toCart(p => [...p, ...newItems])
    }


    return (
        <div data-testid="item-card" className="item_card">
            <h4>{item.name}</h4>
            
            <img 
                src={item.sprites.other['official-artwork'].front_default} 
                alt="👕"
            />
    
            <h5>Price: {item.weight}  🔮</h5>
            <div className="card_inputs">
                <input data-testid="item-input" type="number" id={item.id}
                onChange={e => handleChange(e)} value={input}
                min={1} max={10} />
                <button data-testid="item-btn" onClick={() => handleToCart(item, input)}
                disabled={!btnStatus}
                >Add to cart</button>
            </div>
            <details>
                <summary><span>Stats</span></summary>
                <ul className="stats">
                    {formatDesc(item.stats).split(/\n/g).map(stat => <li key={item.id}>{stat}</li>)}
                </ul>
            </details>
        </div>
    )
}
/**
 * SHOP CONTEXT  = [ITEMS , SETITEMS]
 */
const Shop = () => {
    const items = useOutletContext().shop[0].items
    const setItems = useOutletContext().shop[1]
    const isLoading = useOutletContext().shop[0].isLoading
    const [cart, setCart] = useOutletContext().cart
    const [needItems, setNeedItems] = useState(false)
    
    useEffect(() => {
        (async () => {
            if(needItems) {
                const newItems = await getData(15)
                setItems(prev => {
                    return {
                        items: [...prev.items, ...newItems],
                        isLoading: false
                    }
                })
                setNeedItems(false)
            }
        })();
    }, [needItems])

    useEffect(() => {
        const watcher = document.getElementById('store_watcher')
        const observer = new IntersectionObserver(([entry]) => {
            console.log('end of the shop %s', entry.isIntersecting)
            if(entry.isIntersecting){
                setNeedItems(true)
            }
        })

        observer.observe(watcher)

        return () => {
            if(watcher) { observer.disconnect() }
        }
    }, [])


    return (
        <main data-testid="shop">
            {isLoading ? (
                <Loader />
                ) : (
                <div className="shop_wrapper">
                    {items.map(item => <Card key={item.id} item={item} toCart={setCart}/> )}
                </div>
                )
            }
            <div id="store_watcher"/>
        </main>
    )

}


export { Shop }