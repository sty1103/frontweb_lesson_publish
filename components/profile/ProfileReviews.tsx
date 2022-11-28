import ReviewBoxContainer from '@/containers/ReviewBoxContainer';
import styles from '@/styles/profile/ProfileReviews.module.scss';

interface Props {
  className?: string;
}

export default function MyPageReviews({ className }: Props) {
  return (
    <div className={styles.root}>
      {[...Array(10)].map((v,k) => {
        return (
          <ReviewBoxContainer className={styles.item} key={k} />
        )
      })}
    </div>
  )
}