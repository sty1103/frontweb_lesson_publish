import ReviewPopUp from '@/components/ReviewPopup';

interface Props {
  show?: boolean;
  onClose?: Function;
}

export default function ReviewPopUpContainer(props: Props) {
  return <ReviewPopUp { ...props } />
}