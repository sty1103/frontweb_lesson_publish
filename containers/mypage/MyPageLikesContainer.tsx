import MyPageLikes from '@/components/mypage/MyPageLikes';

interface Props {
  className?: string;
}

export default function MyPageLikesContainer(props: Props) {
  return <MyPageLikes {...props} />;
}