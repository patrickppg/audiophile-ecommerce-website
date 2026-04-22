import { Form, Link, useNavigate } from "react-router"
import type { CartItem } from "./cart/add"
import type { Route } from "./+types/Checkout"
import { formatPrice } from "~/utils"

export function clientLoader() {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") as string) 

  return { cart }
}

export default function Checkout({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData
  const navigate = useNavigate()

  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const shipping = 50
  const vat = Math.round(total * 0.2)
  const grandTotal = total + shipping
  
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <section>
        <h1>Checkout</h1>
        <Form>
          <fieldset>
            <legend>Billing details</legend>
            <div>
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
            <div>
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
            <div>
              <fieldset>
                <legend>Payment Method</legend>
                <div>
                  <label>
                    <input type="radio" name="method" value="emoney" />
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
      <section>
        <h2>Summary</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <b>{item.name}</b>{": "}
              <span>{formatPrice(item.price)}</span>{", "}
              <span>{item.quantity} unit{item.quantity > 1 ? "s" : ""}</span>
            </li>
          ))}
        </ul>
        <dl>
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
        <button>Continue & Pay</button>
        <div>
          <p>Thank You for your order</p>
          <p>You will receive an email confirmation shortly.</p>
          <div>
            <span>{cart[0].name}</span>
            <span>{formatPrice(cart[0].price)}</span>
          </div>
          <div>quantity: {cart[0].quantity}</div>
          <hr />
          {cart.length >= 2 && <p>and {cart.length - 1} other item(s)</p>}
          <div>
            <span>Grand total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <Link to="/">Back to Home</Link>
        </div>
      </section>
    </div>
  )
}