import classNames from "classnames";
import styles from "./styles.module.scss";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  icon: "logout" | "menu-button" | "refresh" | "search" | "setting";
}

const IconButton: React.FC<Props> = ({
  children,
  icon,
  className,
  ...props
}) => (
  <button {...props} className={classNames(className, styles["icon-button"])}>
    <i className={classNames(`icon-${icon}`, styles.icon)} />
  </button>
);

export default IconButton;
