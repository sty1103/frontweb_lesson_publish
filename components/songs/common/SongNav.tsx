import styles from '@/styles/songs/common/SongNav.module.scss';

interface Props {
  className?: string;
  children: any;
}

export default function SongNav({ className, children }: Props) {
  return (
    <div className={`${styles.nav} ${className}`}>
      {children}
    </div>
  )
}