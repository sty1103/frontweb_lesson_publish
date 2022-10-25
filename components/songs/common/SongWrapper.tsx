import styles from '@/styles/songs/common/SongWrapper.module.scss';

interface Props {
  className?: string;
  children: any;
}

export default function SongWrapper({ className, children }: Props) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      {children}
    </div>
  )
}