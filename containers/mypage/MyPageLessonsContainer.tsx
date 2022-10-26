import MyPageLessons from '@/components/mypage/MyPageLessons';
import { IData } from '../songs/SongsContainer';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageLessonsContainer(props: Props) {
  return <MyPageLessons {...props} />;
}