import styles from '@/styles/common/Button.module.scss';

interface IButtonProps {
  children: any;
  className?: string;
  shape?: string;
  onClick: Function;
}

export default function Button({ children, className, shape, onClick=() => {} }: IButtonProps) {
  return (
    <button
      className={`${styles.btn} ${className} ${shape==='rect' ? styles['shape-rect']:''}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  )
}