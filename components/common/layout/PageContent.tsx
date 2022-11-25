import styles from '@/styles/common/layout/PageContent.module.scss';

interface Props {
  className?: string;
  children?: any
}

export default function PageContent({ className, children }: Props) {
  return (
    <div className={`${styles.root} ${className}`}>
      {children}
    </div>
  )
}