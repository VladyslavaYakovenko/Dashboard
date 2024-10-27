import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import Image from "next/image";
import { ProfileInfo } from "../../core/types";

interface Props {
  data: ProfileInfo;
}

const ProfileCard: React.FC<Props> = ({ data }) => {
  const [userPhotoUrl, setUserPhotoUrl] = useState("");
  useEffect(() => {
    fetch(`https://random.imagecdn.app/${size}/${size}`).then((res) =>
      setUserPhotoUrl(res.url)
    );
  }, []);

  const size = 80;

  return (
    <div className={styles["profile-container"]}>
      <div className={styles["profile-top"]}>
        <span className={styles["profile-text"]}>{data.fullname}</span>
        <span className={styles["profile-text"]}>{data.smallIntro}</span>
        <div className={styles["profile-image-container"]}>
          {userPhotoUrl && (
            <Image src={userPhotoUrl} width={size} height={size} alt="" />
          )}
        </div>
      </div>
      <div className={styles.description}>{data.description}</div>
      <div className={styles["profile-bottom"]}>
        <div className={styles.item}>
          <span className={styles.value}>{data.customers}</span>
          <span className={styles.name}>Customers</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{data.products}</span>
          <span className={styles.name}>Products</span>
        </div>
        <div className={styles.item}>
          <span className={styles.value}>{data.followers}</span>
          <span className={styles.name}>Followers</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
