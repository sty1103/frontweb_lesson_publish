import MyPageReviews from '@/components/profile/ProfileReviews';

interface Props {
  className?: string;
}

export default function MyPageReviewsContainer(props: Props) {
  return <MyPageReviews {...props} />;
}