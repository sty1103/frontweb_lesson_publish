import styles from '@/styles/songs/common/SongRoot.module.scss';

interface Props {
  className?: string;
  children: any;
}

export default function SongRoot({ className, children }: Props) {
  return (
    <section className={`${styles.root} ${className}`}>
      {children}
    </section>
  )
}