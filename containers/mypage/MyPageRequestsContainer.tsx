import MyPageRequests from '@/components/mypage/MyPageRequests';
import { IData } from '../songs/SongsContainer';

interface Props {
  className?: string;
  data: IData[];
}

export default function MyPageRequestsContainer(props: Props) {
  return <MyPageRequests {...props} />;
}