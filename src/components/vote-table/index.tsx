import { CustomerRating } from "../../core/types";
import styles from "./styles.module.scss";

import formatThousands from "format-thousands";
import IconButton from "../common/icon-button";
import classNames from "classnames";

interface ProgressBarProps {
  progress: number;
  color: "yellow" | "blue" | "red" | "green";
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className={styles["progress"]}>
      <div
        className={classNames(styles["progress-bar"], styles[color])}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

interface Props {
  votes: number;
  customerRatings: CustomerRating;
  className?: string;
}

const VoteTable: React.FC<Props> = ({ votes, customerRatings, className }) => (
  <div className={classNames(styles["table-wrapper"], className)}>
    <div className={styles.top}>
      <h3>Customer Ratings</h3>
      <div className={styles.left}>
        <span>{`${formatThousands(votes, ",")} Votes`}</span>
        <IconButton icon="refresh" />
      </div>
    </div>
    <div className={styles.body}>
      <div className={styles.row}>
        <div className={styles.col}>
          <i className="icon-happy" />
          <p>The product is Awesome</p>
        </div>
        <div className={styles.col}>
          <ProgressBar progress={customerRatings.awesome} color="green" />
        </div>
        <div className={styles.col}>{customerRatings.awesome}%</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <i className="icon-smiley" />
          <p>Yeah I’m Satisfied with it</p>
        </div>
        <div className={styles.col}>
          <ProgressBar progress={customerRatings.satisfied} color="blue" />
        </div>
        <div className={styles.col}>{customerRatings.satisfied}%</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <i className="icon-sad" />
          <p>Average product, not bad</p>
        </div>
        <div className={styles.col}>
          <ProgressBar progress={customerRatings.average} color="yellow" />
        </div>
        <div className={styles.col}>{customerRatings.average}%</div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <i className="icon-angry" />
          <p>Not usefull at all it Sucks</p>
        </div>
        <div className={styles.col}>
          <ProgressBar progress={customerRatings.poor} color="red" />
        </div>
        <div className={styles.col}>{customerRatings.poor}%</div>
      </div>
    </div>
  </div>
);

export default VoteTable;
