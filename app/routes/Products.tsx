import { getProducts } from "~/data"
import type { Route } from "./+types/Products"
import { Link } from "react-router"
import ShopList from "~/components/ShopList"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const products = await getProducts(params.category)

  return { products }
}

export default function Products({ loaderData, params }: Route.ComponentProps) {
  const category = params.category.at(0)?.toUpperCase() + params.category.slice(1)
  
  return (
    <>
      <header>
        <h1>{category}</h1>
      </header>
      {
        loaderData.products.map(product => (
          <section key={product.id}>
            <h2>{product.name}</h2>
            {product.new && <p>New product</p>}
            <p>{product.description}</p>
            <Link to={`${product.id}/${product.slug}`}>See product</Link>
            <img src={product.categoryImage.desktop} alt="" />
          </section>
        ))
      }
      <ShopList />
    </>
  )
}