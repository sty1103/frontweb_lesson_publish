import styles from '@/styles/posts/common/PostDetailRoot.module.scss';

interface Props {
  className?: string;
  children?: any
}

export default function PostDetailRoot({ className, children }: Props) {
  return (
    <section className={`${styles.section} ${className}`}>
      {children}
    </section>
  )
}