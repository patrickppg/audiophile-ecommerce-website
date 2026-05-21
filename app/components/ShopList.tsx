import { Link } from "react-router";
import "../styles/ShopList.css"
import { IconArrowRight } from "./Icons";

type Props = {
  className?: string,
  onNavigate?: () => any
}

export default function ShopList({ className, onNavigate }: Props) {
  return (
    <ul className={`shop-list ${className}`}>
      <li className="item-category">
        <Link to="/products/headphones" aria-label="Shop Headphones" onClick={() => onNavigate?.()}>
          <img className="product" src="/images/shared/desktop/image-category-thumbnail-headphones.png" alt="" />
          <span className="name" aria-hidden="true">Headphones</span>
          <span className="shop" aria-hidden="true">Shop <IconArrowRight /></span>
        </Link>
      </li>
      <li className="item-category">
        <Link to="/products/speakers" aria-label="Shop Speakers" onClick={() => onNavigate?.()}>
          <img className="product" src="/images/shared/desktop/image-category-thumbnail-speakers.png" alt="" />
          <span className="name" aria-hidden="true">Speakers</span>
          <span className="shop" aria-hidden="true">Shop <IconArrowRight /></span>
        </Link>
      </li>
      <li className="item-category">
        <Link to="/products/earphones" aria-label="Shop Earphones" onClick={() => onNavigate?.()}>
          <img className="product" src="/images/shared/desktop/image-category-thumbnail-earphones.png" alt="" />
          <span className="name" aria-hidden="true">Earphones</span>
          <span className="shop" aria-hidden="true">Shop <IconArrowRight /></span>
        </Link>
      </li>
    </ul>
  )
}