import { useEffect, useRef } from "react"
import { Link, useFetcher } from "react-router"
import type { CartItem } from "~/routes/cart/add"
import { formatPrice } from "~/utils"
import "../styles/Cart.css"
import Spinbutton from "./Spinbutton/Spinbutton"
import { IconCart } from "./Icons"

interface Props {
  cart: CartItem[]
}

export default function Cart({ cart }: Props) {
  const refCartLabel = useRef<HTMLDivElement>(null)
  const fetcher = useFetcher()
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
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

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (e.currentTarget.contains(e.relatedTarget)) return
    if (!document.contains(e.relatedTarget)) return

    e.currentTarget.hidePopover()
  }

  function handleMouseDown(e: React.SyntheticEvent<HTMLButtonElement>) {
    const popover = document.getElementById(e.currentTarget.getAttribute("popovertarget")!)
    if (popover?.matches(":popover-open")) e.preventDefault()
  }

  useEffect(() => {
    refCartLabel.current?.setAttribute("autofocus", "")
  }, [])

  const total = formatPrice(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  return (
    <>
      <button className="cart" aria-label="Cart" popoverTarget="popover-cart" onMouseDown={handleMouseDown}>
        <IconCart aria-hidden="true" />
      </button>
      <div id="popover-cart" className="cart" popover="auto" onBlur={handleBlur}>
        <div className="container-label-remove">
          <div className="label-cart" ref={refCartLabel} tabIndex={-1}>Cart ({cart.length})</div>
          <button className="remove" onClick={handleRemoveAllClick}>Remove all</button>
        </div>
        <ul className="items">
          {cart.map(item => (
            <li className="item" key={item.id}>
              <img className="product" src={item.image} alt="" />
              <span className="details">
                <strong className="name">{item.name}</strong>
                <span className="price">{formatPrice(item.price)}</span>
              </span>
              <Spinbutton className="quantity" type="number" defaultValue={item.quantity} data-product-id={item.id} onChange={handleChange} />
            </li>
          ))}
        </ul>
        <p className="total">TOTAL <strong>{total}</strong></p>
        <Link to="/checkout" className="checkout widget-style-1">Checkout</Link>
      </div>
    </>
  )
}