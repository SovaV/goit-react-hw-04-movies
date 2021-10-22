import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav>
      <NavLink exact to="/" className={styles.link} activeClassName={styles.activeLink}>
        HomePage
      </NavLink>

      <NavLink exact to="/movies" className={styles.link} activeClassName={styles.activeLink}>
        MoviesPage
      </NavLink>
    </nav>
  );
}
