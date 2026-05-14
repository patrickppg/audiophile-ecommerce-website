import { getProduct } from "~/data"
import type { Route } from "./+types/Product"
import { formatPrice } from "~/utils"
import { Link, useFetcher, useNavigate } from "react-router"
import ShopList from "~/components/ShopList"
import "../styles/Product.css"
import Spinbutton from "~/components/Spinbutton/Spinbutton"
import { useState } from "react"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id)

  return { product }
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const [value, setValue] = useState(1)
  const { product } = loaderData
  const navigate = useNavigate()
  const fetcher = useFetcher()

  return (
    <div className="page-product">
      <button className="back" onClick={() => navigate(-1)}>Go Back</button>
      <section className="overview">
        <img src={product.image.desktop} alt="" />
        <div className="container-content">
          {product.new && <p className="new">New product</p>}
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p className="price"><b>{formatPrice(product.price)}</b></p>
          <fetcher.Form method="POST" action="/cart/add">
            <Spinbutton
              className="quantity"
              name="quantity"
              value={value}
              min={1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(Number(e.currentTarget.value))}
              onDecrement={() => setValue(value - 1)}
              onIncrement={() => setValue(value + 1)}
            />
            <input type="hidden" name="id" value={product.id} />
            <button className="widget-style-1">add to cart</button>
          </fetcher.Form>
        </div>
      </section>
      <div className="container-features-box">
        <section className="features">
          <h2>Features</h2>
          <p>{product.features}</p>
        </section>
        <section className="in-the-box">
          <h2>In the box</h2>
          <ul>
            {product.includes.map((item, i) => (
              <li key={i}>
                <span className="quantity">{item.quantity}x</span> <span className="item">{item.item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="gallery">
        <img className="first" src={product.gallery.first.desktop} alt="" />
        <img className="second" src={product.gallery.second.desktop} alt="" />
        <img className="third" src={product.gallery.third.desktop} alt="" />
      </div>
      <section className="similar-products">
        <h2>You may also like</h2>
        <ul>
          {product.others.map((item, i) => (
            <li key={i}>
              <img src={product.others[i].image.desktop} alt="" />
              <strong>{item.name}</strong>
              <Link className="widget-style-1" to={item.url}>See product</Link>
            </li>
          ))}
        </ul>
      </section>
      <ShopList />
    </div>
  )
}