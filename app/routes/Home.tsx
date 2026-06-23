import { Link } from "react-router";
import ShopList from "~/components/ShopList";
import "../styles/Home.css"

export default function Home() {
  return (
    <>
      <section className="section-hero">
        <div className="container-hero-content">
          <p className="new">New product</p>
          <h1>XX99 Mark II Headphones</h1>
          <p className="description">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
          <Link to="/products/headphones/3/xx99-mark-two-headphones" className="widget-style-1">See product</Link>
        </div>
      </section>
      <ShopList />
      <div>
        <section className="section-zx9-speaker">
          <img src="/images/home/desktop/image-speaker-zx9.png" alt="" />
          <div className="container-content">
            <h2>ZX9 speaker</h2>
            <p>Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Link className="widget-style-2" to="/products/speakers/6/zx9-speaker">See product</Link>
          </div>
        </section>
      </div>
      <div>
        <section className="section-zx7-speaker">
          <h2>ZX7 speaker</h2>
          <Link className="widget-style-3" to="/products/speakers/5/zx7-speaker">See product</Link>
          <picture>
            <source srcSet="/images/home/mobile/image-speaker-zx7.jpg" media="(max-width: 650px)" />
            <source srcSet="/images/home/tablet/image-speaker-zx7.jpg" media="(max-width: 1000px)" />
            <img src="/images/home/desktop/image-speaker-zx7.jpg" alt="" />
          </picture>
        </section>
      </div>
      <div>
        <section className="section-yx1-earphones">
          <img src="/images/home/desktop/image-earphones-yx1.jpg" alt="" />
          <div className="container-content">
            <h2>YX1 earphones</h2>
            <Link className="widget-style-3" to="/products/earphones/1/yx1-earphones">See product</Link>
          </div>
        </section>
      </div>
    </>
  )
}