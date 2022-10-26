import LessonPopup from "@/components/LessonPopup";

export interface Props {
  className?: string;
  show?: boolean
  onClose?: Function;
}

export default function LessonPopupContainer(props: Props) {
  return <LessonPopup {...props} />
}