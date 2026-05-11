import { Form, Link, useNavigate } from "react-router"
import type { CartItem } from "./cart/add"
import type { Route } from "./+types/Checkout"
import { formatPrice } from "~/utils"
import "../styles/Checkout.css"
import { useState } from "react"

export function clientLoader() {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") as string) 

  return { cart }
}

export default function Checkout({ loaderData }: Route.ComponentProps) {
  const [isPaid, setIsPaid] = useState(false)
  
  const { cart } = loaderData
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const shipping = 50
  const vat = Math.round(total * 0.2)
  const grandTotal = total + shipping
  
  return (
    <div className="page-checkout">
      <button className="back" onClick={() => navigate(-1)} hidden={isPaid}>Go Back</button>
      <div className="container-checkout-summary" hidden={isPaid}>
        <section className="checkout">
          <h1>Checkout</h1>
          <Form>
            <fieldset>
              <legend>Billing details</legend>
              <div className="container-billing">
                <label>
                  Name
                  <input type="text" name="name" />
                </label>
                <label>
                  Email Address
                  <input type="email" name="email" />
                </label>
                <label>
                  Phone Number
                  <input type="text" name="phone" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Shipping info</legend>
              <div className="container-shipping">
                <label>
                  Address
                  <input type="text" name="address" />
                </label>
                <label>
                  ZIP Code
                  <input type="text" name="zip" />
                </label>
                <label>
                  City
                  <input type="text" name="city" />
                </label>
                <label>
                  Country
                  <input type="text" name="country" />
                </label>
              </div>
            </fieldset>
            <fieldset>
              <legend>Payment details</legend>
              <div className="container-payment">
                <fieldset className="method">
                  <legend className="label">Payment Method</legend>
                  <div>
                    <label>
                      <input type="radio" name="method" value="emoney" defaultChecked />
                      e-Money
                    </label>
                    <label>
                      <input type="radio" name="method" value="cash" />
                      Cash on Delivery
                    </label>
                  </div>
                </fieldset>
                <label>
                  e-Money Number
                  <input type="text" name="emoney_number" />
                </label>
                <label>
                  e-Money PIN
                  <input type="text" />
                </label>
                <p>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
              </div>
            </fieldset>
          </Form>
        </section>
        <section className="summary">
          <h2>Summary</h2>
          <ul className="items">
            {cart.map(item => (
              <li className="item" key={item.id}>
                <img className="product" src={item.image} alt="" />
                <span className="details">
                  <strong className="name">{item.name}</strong>
                  <span className="price">{formatPrice(item.price)}</span>
                </span>
                <span className="quantity" aria-hidden="true">x{item.quantity}</span>
                <span className="visually-hidden">{`${item.quantity} unit${item.quantity > 1 ? "s" : ""}`}</span>
              </li>
            ))}
          </ul>
          <dl className="pricing-details">
            <div>
              <dt>Total</dt>
              <dd>{formatPrice(total)}</dd>
            </div>
            <div>
              <dt>Shipping</dt>
              <dd>{formatPrice(shipping)}</dd>
            </div>
            <div>
              <dt>VAT (included)</dt>
              <dd>{formatPrice(vat)}</dd>
            </div>
            <div>
              <dt>Grand total</dt>
              <dd>{formatPrice(grandTotal)}</dd>
            </div>
          </dl>
          <button className="pay widget-style-1" onClick={() => setIsPaid(true)}>Continue & Pay</button>
        </section>
      </div>
      <div className="container-order" hidden={!isPaid}>
        <h1>Thank You<br />for your order</h1>
        <p>You will receive an email confirmation shortly.</p>
        <div className="container-order-details">
          <div>
            <ul className="items">
              <li className="item">
                <img className="product" src={cart[0].image} alt="" />            
                <span className="details">
                  <strong className="name">{cart[0].name}</strong>
                  <span className="price">{formatPrice(cart[0].price)}</span>
                </span>
                <span className="quantity" aria-hidden="true">x{cart[0].quantity}</span>
                <span className="visually-hidden">{`${cart[0].quantity} unit${cart[0].quantity > 1 ? "s" : ""}`}</span>
              </li>
            </ul>
            <hr />
            {cart.length >= 2 && <p>and {cart.length - 1} other item(s)</p>}
          </div>
          <dl className="total">
            <dt>Grand total</dt>
            <dd>{formatPrice(grandTotal)}</dd>
          </dl>
        </div>
        <Link className="widget-style-1" to="/">Back to Home</Link>
      </div>
    </div>
  )
}