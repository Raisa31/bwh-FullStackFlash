import Category from "./Category.jsx";

const CategoriesList = () => {
  return (
    <div className="CategoriesList">
      <h2>Categories</h2>
      <Category title="Cooking" />
      <Category title="Crafts" />
      <Category title="Outdoor" />
      <Category title="Arts" />
      <Category title="Music" />
    </div>
  )
}

export default CategoriesList;