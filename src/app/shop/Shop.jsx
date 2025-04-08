import { useOutletContext} from "react-router"
import { useState } from "react"
import { Loader } from "../misc/Loader.jsx"
import { formatDesc } from "../misc/utility.js"


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

const Shop = () => {
    const items = useOutletContext().shop.items
    const isLoading = useOutletContext().shop.isLoading
    const [cart, setCart] = useOutletContext().cart
    
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
        </main>
    )

}


export { Shop }