import ReviewItem from '../item/review/ReviewItem';
import styles from './ReviewList.module.scss';

interface Props {
  className?: string;
}

export default function ReviewList({ className }: Props) {
  return (
    <div className={styles.root}>
      {[...Array(10)].map((v,k) => {
        return (
          <ReviewItem className={styles.item} key={k} />
        )
      })}
    </div>
  )
}