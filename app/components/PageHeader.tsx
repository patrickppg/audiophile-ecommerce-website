import { Link } from "react-router";
import Cart from "./Cart";
import "../styles/PageHeader.css"
import type { CartItem } from "~/routes/cart/add";

interface Props {
  cart: CartItem[]
}

export default function PageHeader({ cart }: Props) {
  return (
    <header className="page-header">
      <div className="container-content">
        <img src="/images/shared/desktop/logo.svg" alt="The Audiophile company" />
        <nav className="style-1">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="products/headphones">Headphones</Link></li>
            <li><Link to="products/speakers">Speakers</Link></li>
            <li><Link to="products/earphones">Earphones</Link></li>
          </ul>
        </nav>
        <Cart cart={cart} />
      </div>
    </header>
  )
}