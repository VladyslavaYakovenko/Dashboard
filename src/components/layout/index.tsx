import classNames from "classnames";
import { useState } from "react";
import Navbar from "../navbar";
import Topbar from "../topbar";
import styles from "./styles.module.scss";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false);

  const handleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <div
      className={classNames(styles.layout, {
        [styles["navbar-open"]]: navbarOpen,
      })}
    >
      <Topbar navbarOpen={navbarOpen} onNavbarOpen={handleNavbar} />
      <Navbar open={navbarOpen} />
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
