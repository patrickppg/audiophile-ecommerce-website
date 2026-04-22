import { Link } from "react-router";

export default function ShopList() {
  return (
    <ul>
      <li>
        <Link to="/products/headphones">
          <img src="/images/shared/desktop/image-category-thumbnail-headphones.png" alt="" />
          Shop Headphones
        </Link>
      </li>
      <li>
        <Link to="/products/speakers">
          <img src="/images/shared/desktop/image-category-thumbnail-speakers.png" alt="" />
          Shop Speakers
        </Link>
      </li>
      <li>
        <Link to="/products/earphones">
          <img src="/images/shared/desktop/image-category-thumbnail-earphones.png" alt="" />
          Shop Earphones
        </Link>
      </li>
    </ul>
  )
}