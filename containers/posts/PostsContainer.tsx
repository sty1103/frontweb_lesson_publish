import Posts from '@/components/posts/Posts'

export interface IData {
  type: string;
}

export interface Props {
  className?: string
  showFilterOrder?: boolean;
  showFilterPost?: boolean;
  showFilterInstrument?: boolean
}

export default function PostsContainer(props: Props) {
  return <Posts {...props} />;
}