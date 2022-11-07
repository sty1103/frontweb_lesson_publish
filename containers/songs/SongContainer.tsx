import Songs from '@/components/songs/Song'

export interface Props {
  className?: string;
  onClickSong?: Function;
  data: IData
  key?: string | number;
}

export interface IData {
  title: string;
  artist: string;
  rate: number;
}

export default function SongContainer(props: Props) {
  return <Songs {...props} />;
}