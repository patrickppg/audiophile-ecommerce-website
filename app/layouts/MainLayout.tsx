import { Link, Outlet, useLocation } from "react-router";
import type { Route } from "./+types/MainLayout";
import type { CartItem } from "~/routes/cart/add";
import Cart from "~/components/Cart";

export function clientLoader() {
  const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]")
  return { cart }
}

export default function MainLayout({ loaderData }: Route.ComponentProps) {
  const { cart } = loaderData

  const location = useLocation()
  const isAsideHidden = location.pathname === "/checkout"
  
  return (
    <>
      <header>
        <img src="/images/shared/desktop/logo.svg" alt="The Audiophile company" />
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="products/headphones">Headphones</Link></li>
            <li><Link to="products/speakers">Speakers</Link></li>
            <li><Link to="products/earphones">Earphones</Link></li>
          </ul>
        </nav>
        <Cart cart={cart} />
      </header>
      <main><Outlet /></main>
      {!isAsideHidden && (
        <aside>
          <h2>Bringing you the best audio gear</h2>
          <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          <img src="/images/shared/desktop/image-best-gear.jpg" alt="" />
        </aside>
      )}
      <footer>
        <img src="/images/shared/desktop/logo.svg" alt="The Audiophile company" />
        <p>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
        <p>Copyright 2021. All Rights Reserved</p>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="products/headphones">Headphones</Link></li>
            <li><Link to="products/speakers">Speakers</Link></li>
            <li><Link to="products/earphones">Earphones</Link></li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li><Link to="/">Facebook</Link></li>
            <li><Link to="/">Twitter</Link></li>
            <li><Link to="/">Instagram</Link></li>
          </ul>
        </nav>
      </footer>
    </>
  )
}