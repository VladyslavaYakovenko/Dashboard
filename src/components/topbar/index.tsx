import classNames from "classnames";
import IconButton from "../common/icon-button";
import styles from "./styles.module.scss";

interface Props {
  navbarOpen: boolean;
  onNavbarOpen(): void;
}

const Topbar: React.FC<Props> = ({ navbarOpen, onNavbarOpen }) => (
  <nav
    className={classNames(styles.topbar, {
      [styles["navbar-open"]]: navbarOpen,
    })}
  >
    <div className={styles.part}>
      <IconButton
        className={styles.button}
        icon="menu-button"
        onClick={onNavbarOpen}
      />
      <IconButton className={styles.button} icon="search" />
    </div>
    <div className={styles.part}>
      <IconButton className={styles.button} icon="setting" />
      <IconButton className={styles.button} icon="logout" />
    </div>
  </nav>
);

export default Topbar;
