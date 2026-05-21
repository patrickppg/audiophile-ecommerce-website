import { Link } from "react-router";
import Cart from "./Cart";
import "../styles/PageHeader.css"
import type { CartItem } from "~/routes/cart/add";
import { IconHamburguer } from "./Icons";
import ShopList from "./ShopList";
import { useRef } from "react";

interface Props {
  cart: CartItem[]
}

export default function PageHeader({ cart }: Props) {
  const refPopover = useRef<HTMLDivElement>(null)
  
  return (
    <header className="page-header">
      <div className="container-content">
        <button className="menu" aria-label="Menu" popoverTarget="popover-mobile-nav">
          <IconHamburguer />
        </button>
        <div popover="auto" id="popover-mobile-nav" ref={refPopover}>
          <ShopList className="mobile-nav" onNavigate={() => refPopover.current?.hidePopover()} />
        </div>
        <img src="/images/shared/desktop/logo.svg" alt="The Audiophile company" />
        <nav className="style-1 desktop-nav">
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