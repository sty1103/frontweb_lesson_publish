import MyPageRequests from '@/components/profile/ProfileRequests';
import { IData } from '../songs/SongContainer';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageRequestsContainer(props: Props) {
  return <MyPageRequests {...props} />;
}