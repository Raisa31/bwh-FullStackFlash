const Category = ({ title, image }) => {
  return (
    <div className="Category">
      <img src={image} />
      <h3>{title}</h3>
    </div>
  )
}

export default Category;