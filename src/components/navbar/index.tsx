import classNames from "classnames";
import styles from "./styles.module.scss";

import Logo from "../../../public/favicon.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import paths from "../../core/paths";
import Link from "../common/icon-link";
import { Data } from "../../core/types";

interface Props {
  open: boolean;
}

const Navbar: React.FC<Props> = ({ open }) => {
  const fetchData = async () => {
    const data = await fetch("./data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => res.json().then((data: Data) => data));

    return data;
  };

  const [data, setData] = useState<Data>();

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  const [userPhotoUrl, setUserPhotoUrl] = useState("");

  const size = 70;

  useEffect(() => {
    fetch(`https://random.imagecdn.app/${size}/${size}`).then((res) =>
      setUserPhotoUrl(res.url)
    );
  }, []);

  return (
    <nav
      className={classNames(styles.navbar, {
        [styles.open]: open,
      })}
    >
      <div className={styles.head}>
        <Logo />
        <h1>Smart</h1>
      </div>
      <div className={styles.main}>
        <div className={styles.profile}>
          {userPhotoUrl && (
            <div
              className={classNames(styles["photo-container"], {
                [styles.online]: data?.account.online,
              })}
            >
              <Image
                className={styles.photo}
                src={userPhotoUrl}
                width={size}
                height={size}
                alt=""
              />
            </div>
          )}
          <div className={styles["profile-info"]}>
            <span className={styles["fullname"]}>{data?.account.fullname}</span>
            <span className={styles["location"]}>{data?.account.location}</span>
          </div>
        </div>
        <div className={styles.links}>
          {paths.withIcons.map((path) => (
            <div className={styles.link} key={path.path}>
              <Link icon={path.icon} to={path.path}>
                {path.name}
              </Link>
              {path.path === "/messages" && !!data?.account.messages && (
                <span className={styles["messages-count"]}>
                  {data.account.messages}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className={styles.separator} />
        <div className={styles.links}>
          {paths.withoutIcons.map((path) => (
            <Link key={path.path} to={path.path}>
              {path.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
