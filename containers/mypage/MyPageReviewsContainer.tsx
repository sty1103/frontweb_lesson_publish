import MyPageReviews from '@/components/mypage/MyPageReviews';

interface Props {
  className?: string;
}

export default function MyPageReviewsContainer(props: Props) {
  return <MyPageReviews {...props} />;
}