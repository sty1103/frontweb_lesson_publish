import MyPageLessons from '@/components/profile/ProfileLessons';
import { IData } from '../songs/SongsContainer';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageLessonsContainer(props: Props) {
  return <MyPageLessons {...props} />;
}