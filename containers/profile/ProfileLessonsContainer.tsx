import MyPageLessons from '@/components/profile/ProfileLessons';
import { IData } from '../songs/SongContainer';

interface Props {
  className?: string;
  songData: IData[];
}

export default function MyPageLessonsContainer(props: Props) {
  return <MyPageLessons {...props} />;
}