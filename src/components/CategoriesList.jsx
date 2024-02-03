import Category from "./Category.jsx";

const CategoriesList = () => {
  return (
    <div className="CategoriesList">
      <h1>Categories</h1>
      <Category title="Cooking" />
      <Category title="Crafts" />
      <Category title="Outdoor" />
      <Category title="Arts" />
      <Category title="Music" />
    </div>
  )
}

export default CategoriesList;