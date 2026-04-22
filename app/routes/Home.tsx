import { Link } from "react-router";
import ShopList from "~/components/ShopList";

export default function Home() {
  return (
    <>
      <section>
        <p>New product</p>
        <h1>XX99 Mark II Headphones</h1>
        <p>Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
        <Link to="/">See product</Link>
        {/* <img src="images/home/desktop/image-hero.jpg" alt="" /> */}
      </section>
      <section>
        <h2>ZX9 speaker</h2>
        <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
        <Link to="/products/speakers/6/zx9-speaker">See product</Link>
      </section>
      <section>
        <h2>ZX7 speaker</h2>
        <Link to="/products/speakers/5/zx7-speaker">See product</Link>
      </section>
      <section>
        <h2>YX1 earphones</h2>
        <Link to="/products/earphones/1/yx1-earphones">See product</Link>
      </section>
      <ShopList />
    </>
  )
}