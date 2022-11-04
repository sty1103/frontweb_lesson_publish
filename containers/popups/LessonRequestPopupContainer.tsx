import LessonRequestPopup from "@/components/popups/LessonRequestPopup";

export interface Props {
  className?: string;
  show?: boolean
  onClose?: Function;
}

export default function LessonRequestPopupContainer(props: Props) {
  return <LessonRequestPopup {...props} />
}