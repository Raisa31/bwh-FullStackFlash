import Category from "./Category.jsx";
import kitchen from '../images/kitchen.png';
import knitting from '../images/knitting.png';
import woodworking from '../images/woodworking.png';
import gardening from '../images/gardening.png'

const CategoriesList = () => {
  return (
    <div className="CategoriesList">
      <h2>Categories</h2>
      <div className="categoriesWrapper">
        <Category title="Kitchen" image={kitchen}/>
        <Category title="Knitting" image={knitting}/>
        <Category title="Woodworking" image={woodworking}/>
        <Category title="Gardening" image={gardening}/>

      </div>
      
    </div>
  )
}

export default CategoriesList;