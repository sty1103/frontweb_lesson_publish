import MyPageLikes from '@/components/profile/ProfileLikes';

interface Props {
  className?: string;
}

export default function MyPageLikesContainer(props: Props) {
  return <MyPageLikes {...props} />;
}