import styles from '@/styles/sign/SignContainer.module.scss';

interface Props {
  children: any;
  className?: string;
}

export default function SignContainer({ children, className }: Props) {
  return (
    <section className={`${styles.container} ${className}`}>
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  )
}