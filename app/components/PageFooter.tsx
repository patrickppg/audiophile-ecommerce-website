import { Link } from "react-router";
import "../styles/PageFooter.css"
import { IconFacebook, IconInstagram, IconTwitter } from "./Icons";

export default function PageFooter() {
  return (
    <footer className="page-footer">
      <div className="container-logo-site">
        <img src="/images/shared/desktop/logo.svg" alt="The Audiophile company" />
        <nav className="style-1">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="products/headphones">Headphones</Link></li>
            <li><Link to="products/speakers">Speakers</Link></li>
            <li><Link to="products/earphones">Earphones</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container-text-social">
        <div className="container-paragraphs">
          <p className="description">Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.</p>
          <p className="copyright">Copyright 2021. All Rights Reserved</p>
        </div>
        <nav className="social-media style-1">
          <ul>
            <li><Link to="/"><span className="visually-hidden">Facebook</span> <IconFacebook aria-hidden="true" /></Link></li>
            <li><Link to="/"><span className="visually-hidden">Twitter</span> <IconTwitter aria-hidden="true" /></Link></li>
            <li><Link to="/"><span className="visually-hidden">Instagram</span> <IconInstagram aria-hidden="true" /></Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}