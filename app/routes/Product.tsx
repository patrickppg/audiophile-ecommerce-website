import { getProduct } from "~/data"
import type { Route } from "./+types/Product"
import { formatPrice } from "~/utils"
import { Link, useFetcher, useNavigate } from "react-router"
import ShopList from "~/components/ShopList"

export async function clientLoader({ params }: Route.LoaderArgs) {
  const product = await getProduct(params.id)

  return { product }
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { product } = loaderData
  const navigate = useNavigate()
  const fetcher = useFetcher()

  return (
    <>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <img src={product.image.desktop} alt="" />
      <h1>{product.name}</h1>
      {product.new && <p>New product</p>}
      <p>{product.description}</p>
      <p><b>{formatPrice(product.price)}</b></p>
      <fetcher.Form method="POST" action="/cart/add">
        <input type="number" name="quantity" />
        <input type="hidden" name="id" value={product.id} />
        <button>add to cart</button>
      </fetcher.Form>
      <section>
        <h2>Features</h2>
        <p>{product.features}</p>
      </section>
      <section>
        <h2>In the box</h2>
        <ul>
          {product.includes.map((item, i) => (
            <li key={i}>
              <span>{item.quantity}x</span> {item.item}
            </li>
          ))}
        </ul>
      </section>
      <div>
        <img src={product.gallery.first.desktop} alt="" />
        <img src={product.gallery.second.desktop} alt="" />
        <img src={product.gallery.third.desktop} alt="" />
      </div>
      <section>
        <h2>You may also like</h2>
        <ul>
          {product.others.map((item, i) => (
            <li key={i}>
              <img src={product.others[i].image.desktop} alt="" />
              <strong>{item.name}</strong>
              <Link to={item.url}>See product</Link>
            </li>
          ))}
        </ul>
      </section>
      <ShopList />
    </>
  )
}