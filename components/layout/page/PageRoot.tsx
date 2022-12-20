import styles from './PageRoot.module.scss';

interface Props {
  className?: string;
  children?: any
}

export default function PageRoot({ className, children }: Props) {
  return (
    <section className={`${styles.root} ${className}`}>
      {children}
    </section>
  )
}