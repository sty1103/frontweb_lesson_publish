import ReviewBox from '@/components/ReviewBox';

interface Props {
  className?: string;
  onClick?: Function;
}

export default function ReviewBoxContainer(props: Props) {
  return <ReviewBox {...props} />
}