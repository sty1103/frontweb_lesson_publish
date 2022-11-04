import LessonVideoPopup from "@/components/popups/LessonVideoPopup";

interface Props {
  className?: string;
  show?: boolean
  onClose?: Function;
}

export default function LessonVideoPopupContainer(props: Props) {
  return (
    <LessonVideoPopup {...props} />
  )
}