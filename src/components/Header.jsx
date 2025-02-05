
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css"; 

function Header() {
  return (
    <header className={styles.header}>
            <nav>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/supplies" className={styles.navLink}>
              Supplies
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>
      
       <img src="/images/banner1.jpg
       " alt="ArtNest Banner" className={styles.banner} />

    </header>
  );
}

export default Header;
