import styles from "./footer.module.css";
import {
  FaFacebook,
  FaSquareXTwitter,
  FaInstagram,
  FaSquareYoutube,
  FaLinkedin,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <div className={styles.logo}>
        <h1>CarHub</h1>
      </div>
      <nav className={styles.navFooter}>
        <ul>
          <li>Comprá un auto</li>
          <li>Vendé tu auto</li>
          <li>Nosotros</li>
          <li>Dolar</li>
          <li>Opiniones</li>
          <li>Historia</li>
        </ul>
      </nav>

      <div className={styles.socialMedia}>
        <FaFacebook />
        <FaSquareXTwitter />
        <FaInstagram />
        <FaSquareYoutube />
        <FaLinkedin />
      </div>
    </footer>
  );
}

export default Footer;
