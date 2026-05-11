import { Outlet, useLocation } from "react-router";
import type { Route } from "./+types/MainLayout";
import type { CartItem } from "~/routes/cart/add";
import PageHeader from "~/components/PageHeader";
import PageFooter from "~/components/PageFooter";
import "../styles/MainLayout.css"

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
      <PageHeader cart={cart} />
      <main><Outlet /></main>
      {!isAsideHidden && (
        <aside className="aside-audiophile">
          <div className="container-content">
            <h2>Bringing you the <span>best</span> audio gear</h2>
            <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
          </div>
          <img src="/images/shared/desktop/image-best-gear.jpg" alt="" />
        </aside>
      )}
      <PageFooter />
    </>
  )
}