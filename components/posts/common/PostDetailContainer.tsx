import styles from '@/styles/posts/common/PostDetailContainer.module.scss';

interface Props {
  className?: string;
  children?: any
}

export default function PostDetailContainer({ className, children }: Props) {
  return (
    <section className={`${styles.container} ${className}`}>
      {children}
    </section>
  )
}