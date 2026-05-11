import { getProducts } from "~/data"
import type { Route } from "./+types/Products"
import { Link } from "react-router"
import ShopList from "~/components/ShopList"
import "../styles/Products.css"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const products = await getProducts(params.category)

  return { products }
}

export default function Products({ loaderData, params }: Route.ComponentProps) {
  const category = params.category.at(0)?.toUpperCase() + params.category.slice(1)
  
  return (
    <div className="page-products">
      <header className="header-products">
        <h1>{category}</h1>
      </header>
      {
        loaderData.products.map(product => (
          <section className="section-products" key={product.id}>
            <div className="container-content">
              {product.new && <p className="new">New product</p>}
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <Link className="widget-style-1" to={`${product.id}/${product.slug}`}>See product</Link>
            </div>
            <img src={product.categoryImage.desktop} alt="" />
          </section>
        ))
      }
      <ShopList />
    </div>
  )
}