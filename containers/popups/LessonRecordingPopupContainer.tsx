import LessonRecordingPopup from "@/components/popups/LessonRecordingPopup";

interface Props {
  className?: string;
  onClose?: Function;
  show?: boolean;
}

export default function LessonRecordingPopupContainer(props: Props) {
  return <LessonRecordingPopup {...props} />;
}