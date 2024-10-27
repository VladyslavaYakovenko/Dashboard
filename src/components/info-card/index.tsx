import classNames from "classnames";
import styles from "./styles.module.scss";

import formatThousands from "format-thousands";

interface Props {
  title: string;
  amount: number;
  className?: string;
  color: "orange" | "blue" | "purple" | "green";
  renderIcon(): JSX.Element;
}

const InfoCard: React.FC<Props> = ({
  title,
  amount,
  className,
  color,
  renderIcon,
}) => (
  <div className={classNames(styles["info-card"], styles[color], className)}>
    <div className={styles.left}>{renderIcon()}</div>
    <div className={styles.right}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.amount}>{formatThousands(amount, ",")}</span>
    </div>
  </div>
);

export default InfoCard;
