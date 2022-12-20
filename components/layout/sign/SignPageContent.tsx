import styles from './SignPageContent.module.scss';
import { useEffect } from 'react';

interface Props {
  children: any;
  className?: string;
}

export default function SignPageContent({ children, className }: Props) {
  useEffect(() => {
    // mobile address bar 계산
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <section className={`${styles.root} ${className}`}>
      <div className={styles.inner}>
        {children}
      </div>
    </section>
  )
}