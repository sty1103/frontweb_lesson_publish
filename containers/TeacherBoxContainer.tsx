import TeacherBox from '@/components/TeacherBox';

interface Props {
  className?: string;
  onClick?: Function;
}

export default function TeacherBoxContainer(props: Props) {
  return <TeacherBox {...props} />
}