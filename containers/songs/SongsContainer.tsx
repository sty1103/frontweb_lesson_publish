import Songs from '@/components/songs/Songs'

export interface Props {
  className?: string;
  onClick?: Function;
  data: IData[]
}

export interface IData {
  title: string;
  artist: string;
  rate: number;
}

export default function SongsContainer(props: Props) {
  return <Songs {...props} />;
}