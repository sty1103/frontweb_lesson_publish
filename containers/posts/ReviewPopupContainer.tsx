import ReviewPopUp from "@/components/posts/ReviewPopup";

interface Props {
  show?: boolean;
  onClose?: Function;
}

export default function ReviewPopUpContainer(props: Props) {
  return <ReviewPopUp { ...props } />
}