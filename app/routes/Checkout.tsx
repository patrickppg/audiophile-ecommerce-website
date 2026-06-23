import { Form, Link, useNavigate } from "react-router"
import type { CartItem } from "./cart/add"
import type { Route } from "./+types/Checkout"
import { formatPrice, getValidationMessage } from "~/utils"
import "../styles/Checkout.css"
import { useState } from "react"

export function clientLoader() {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") as string) 

  return { cart }
}

export default function Checkout({ loaderData }: Route.ComponentProps) {
  const [isPaid, setIsPaid] = useState(false)
  const [method, setMethod] = useState(0)
  const [errorMessages, setErrorMessages] = useState(initialErrorMessages)
  
  const { cart } = loaderData
  const navigate = useNavigate()

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setIsPaid(true)
  }

  function handleInvalid(e: React.InvalidEvent) {
    e.preventDefault()
  }

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
          <Form id="form-checkout" onSubmit={handleSubmit} onInvalid={handleInvalid}>
            <fieldset>
              <legend>Billing details</legend>
              <div className="container-billing">
                <div>
                  <label className={errorMessages.name && "invalid"}>
                    Name
                    <input
                      type="text"
                      name="name"
                      required
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, name: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, name: getValidationMessage(e.target)}))}
                      />
                  </label>
                  <p className="error">{errorMessages.name}</p>
                </div>
                <div>
                  <label className={errorMessages.email && "invalid"}>
                    Email Address
                    <input
                      type="email"
                      name="email"
                      required
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, email: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, email: getValidationMessage(e.target)}))}
                      />
                  </label>
                  <p className="error">{errorMessages.email}</p>
                </div>
                <div>
                  <label className={errorMessages.phone && "invalid"}>
                    Phone Number
                    <input
                      type="text"
                      name="phone"
                      required
                      pattern="\d+"
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, phone: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, phone: getValidationMessage(e.target)}))}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.replace(/\D/g, '')}
                      />
                  </label>
                  <p className="error">{errorMessages.phone}</p>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Shipping info</legend>
              <div className="container-shipping">
                <div>
                  <label className={errorMessages.address && "invalid"}>
                    Address
                    <input
                      type="text"
                      name="address"
                      required
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, address: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, address: getValidationMessage(e.target)}))}
                      />
                  </label>
                  <p className="error">{errorMessages.address}</p>
                </div>
                <div>
                  <label className={errorMessages.zip && "invalid"}>
                    ZIP Code
                    <input
                    type="text"
                    name="zip"
                    required
                    pattern="\d+"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.replace(/\D/g, '')}
                    onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, zip: getValidationMessage(e.target)}))}
                    onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, zip: getValidationMessage(e.target)}))}
                    />
                  </label>
                  <p className="error">{errorMessages.zip}</p>
                </div>
                <div>
                  <label className={errorMessages.city && "invalid"}>
                    City
                    <input
                      type="text"
                      name="city"
                      required
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, city: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, city: getValidationMessage(e.target)}))}
                    />
                  </label>
                  <p className="error">{errorMessages.city}</p>
                </div>
                <div>
                  <label className={errorMessages.country && "invalid"}>
                    Country
                    <input
                      type="text"
                      name="country"
                      required
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, country: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, country: getValidationMessage(e.target)}))}
                      />
                  </label>
                  <p className="error">{errorMessages.country}</p>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend>Payment details</legend>
              <div className="container-payment">
                <fieldset className="method">
                  <legend className="label">Payment Method</legend>
                  <div>
                    <label>
                      <input type="radio" name="method" value="emoney" checked={method === 0} onChange={() => setMethod(0)} />
                      e-Money
                    </label>
                    <label>
                      <input type="radio" name="method" value="cash" checked={method === 1} onChange={() => setMethod(1)} />
                      Cash on Delivery
                    </label>
                  </div>
                </fieldset>
                <div hidden={method === 1}>
                  <label className={errorMessages.emoney && "invalid"}>
                    e-Money Number
                    <input
                      type="text"
                      name="emoney_number"
                      required={method === 0}
                      pattern="\d+"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.replace(/\D/g, '')}
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, emoney: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, emoney: getValidationMessage(e.target)}))}
                      />
                  </label>
                  <p className="error">{errorMessages.emoney}</p>
                </div>
                <div hidden={method === 1}>
                  <label className={errorMessages.emoneyPin && "invalid"}>
                    e-Money PIN
                    <input
                      type="text"
                      name="emoney_pin"
                      required={method === 0}
                      pattern="\d+"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => e.target.value = e.target.value.replace(/\D/g, '')}
                      onBlur={(e: React.SyntheticEvent) => setErrorMessages(p => ({...p, emoneyPin: getValidationMessage(e.target)}))}
                      onInvalid={(e: React.InvalidEvent) => setErrorMessages(p => ({...p, emoneyPin: getValidationMessage(e.target)}))}
                    />
                    
                  </label>
                  <p className="error">{errorMessages.emoneyPin}</p>
                </div>
                <p hidden={method === 0}>The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.</p>
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
          <button className="pay widget-style-1" form="form-checkout">Continue & Pay</button>
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
        <Link className="widget-style-1" to="/" onClick={() => localStorage.setItem("cart", JSON.stringify([]))}>Back to Home</Link>
      </div>
    </div>
  )
}

const initialErrorMessages = {
  name: "",
  email: "",
  phone: "",
  address: "",
  zip: "",
  city: "",
  country: "",
  emoney: "",
  emoneyPin: ""
}