import { Link, useFetcher } from "react-router";
import type { CartItem } from "~/routes/cart/add";
import { formatPrice } from "~/utils";

interface Props {
  cart: CartItem[]
}

export default function Cart({ cart }: Props) {
  const fetcher = useFetcher()
  
  function handleChange(e: React.SyntheticEvent<HTMLInputElement>) {
    fetcher.submit({
      id: e.currentTarget.getAttribute("data-product-id"),
      quantity: e.currentTarget.value
    }, {
      method: "POST",
      action: "/cart/update"
    })
  }

  function handleRemoveAllClick(e: React.SyntheticEvent<HTMLButtonElement>) {
    fetcher.submit(null, { method: "DELETE", action: "/cart/clear"})
  }


  const total = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return (
    <>
      <button>Cart</button>
      <div>
        <div>Cart ({cart.length})</div>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong>
              <span>{formatPrice(item.price)}</span>
              <input type="number" defaultValue={item.quantity} data-product-id={item.id} onChange={handleChange} />
            </li>
          ))}
        </ul>
        <button onClick={handleRemoveAllClick}>Remove all</button>
        <div>
          TOTAL <strong>{total}</strong>
        </div>
        <Link to="/checkout">Checkout</Link>
      </div>
    </>
  )
}