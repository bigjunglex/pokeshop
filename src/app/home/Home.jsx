import { useOutletContext } from "react-router"
import { Loader } from "../misc/Loader"
import { useId } from "react"


const Slide = ({ icon, placement }) => {

  return (
    <div className="slider_item" style={{'--placement': placement}}>
      <img src={icon} alt="slider" />
    </div>
  )
}

const Slider = ({ icons }) => {
  return(
    <div className="slider">
      <div className="list">
        {icons.map((icon, i) => <Slide key={useId()} icon={icon} placement={i + 1}/>)}
      </div>
    </div>
  ) 
}

const Home = () => {
  const isLoading = useOutletContext().shop.isLoading
  const items = useOutletContext().shop.items
  const icons = items.map(item => item.sprites.front_default)

  return ( 
    <div className="home_wrapper">
      {isLoading ? (
          <Loader />
        ) : (
          <Slider icons={icons} />
        )
      }
      <h1 data-testid='greet'>HOME :japanese_ogre: </h1>
    </div>
  )
}


export { Home }